import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NoteDetailPage from "@/pages/NoteDetailPage";
import ArticleDetailPage from "@/pages/ArticleDetailPage";

function App() {
  return (
    <BrowserRouter basename="/Feng-Kejun-s-personal-homepage">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note/:noteId" element={<NoteDetailPage />} />
        <Route path="/article/:articleId" element={<ArticleDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
