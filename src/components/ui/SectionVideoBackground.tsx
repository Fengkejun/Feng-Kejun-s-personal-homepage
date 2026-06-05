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
}

export default function SectionVideoBackground({
  src,
  poster,
  className = "",
  autoPlay = false,
  scrollZoom = false,
}: SectionVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [videoReady, setVideoReady] = useState(false);

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

    // "playing" = video has started and is actively rendering frames
    const onPlaying = () => {
      // Small delay to ensure the frame is painted on screen
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
      video.preload = "auto";
      if (autoPlay) video.play().catch(() => {});
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [autoPlay, src]);

  // ── IntersectionObserver: play/pause ──
  useEffect(() => {
    if (autoPlay) return;
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
  }, [autoPlay]);

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
            // Keep poster interactive until fully hidden
            pointerEvents: videoReady ? "none" : "auto",
          }}
        />
      )}

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        className="section-video absolute inset-0 w-full h-full object-cover will-change-transform"
      />
    </div>
  );
}
