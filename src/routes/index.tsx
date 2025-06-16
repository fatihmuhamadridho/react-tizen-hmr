import { Routes, Route, HashRouter } from 'react-router';
import HomePage from '../components/pages/HomePage';
import PlayListPage from '../components/pages/PlayListPage';
import WebOSPage from '../components/pages/WebOSPage';

const RouterProvider = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WebOSPage />} />
        <Route path="/playlist" element={<PlayListPage />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterProvider;
