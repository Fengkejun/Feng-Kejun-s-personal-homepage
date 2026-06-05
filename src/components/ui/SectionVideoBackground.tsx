import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionVideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  scrollZoom?: boolean;
  zoom?: number;
  lazy?: boolean;
}

export default function SectionVideoBackground({
  src,
  poster,
  className = "",
  autoPlay = false,
  scrollZoom = false,
  zoom = 1,
  lazy = true,
}: SectionVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy || autoPlay);

  // ── Lazy: start loading when container is near viewport ──
  useEffect(() => {
    if (shouldLoad || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  // ── Scroll-zoom ──
  useEffect(() => {
    if (!scrollZoom || !containerRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.2 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollZoom]);

  // ── Poster: fade out only when video is TRULY rendering frames ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !poster) return;

    const onPlaying = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVideoReady(true);
        });
      });
    };

    video.addEventListener("playing", onPlaying, { once: true });
    return () => video.removeEventListener("playing", onPlaying);
  }, [poster]);

  // ── Load video ──
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    if (src.endsWith(".m3u8")) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        if (autoPlay) video.play().catch(() => {});
      } else {
        import("hls.js").then(({ default: Hls }) => {
          if (Hls.isSupported()) {
            const hls = new Hls({
              startLevel: 0,
              capLevelToPlayerSize: true,
              maxBufferLength: 3,
              maxMaxBufferLength: 10,
              backBufferLength: 0,
              enableWorker: true,
            });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (autoPlay) video.play().catch(() => {});
            });
            hlsRef.current = hls;
          }
        });
      }
    } else {
      video.src = src;
      video.preload = "metadata";
      if (autoPlay) video.play().catch(() => {});
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [autoPlay, src, shouldLoad]);

  // ── IntersectionObserver: play/pause ──
  useEffect(() => {
    if (autoPlay || !shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay, shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Poster — instant, fades only when video has real frames on screen */}
      {poster && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[1]"
          style={{
            backgroundImage: `url(${poster})`,
            opacity: videoReady ? 0 : 1,
            transition: "opacity 0.8s ease-in-out",
            pointerEvents: videoReady ? "none" : "auto",
          }}
        />
      )}

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="section-video absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ transform: zoom > 1 ? `scale(${zoom})` : undefined }}
      />
    </div>
  );
}
