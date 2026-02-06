import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./Pages/Home.jsx";
import Movies from "./Pages/Movies.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import MovieDetail from "./Pages/MovieDetail.jsx";
import Favorit from "./Pages/Favorit.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="favorites" element={<Favorit />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
