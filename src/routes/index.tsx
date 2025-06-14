import { Routes, Route, HashRouter } from 'react-router';
import HomePage from '../components/pages/HomePage';
import PlayListPage from '../components/pages/PlayListPage';

const RouterProvider = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlist" element={<PlayListPage />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterProvider;
