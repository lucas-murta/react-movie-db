import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import ButtonTest from '../pages/button-test/ButtonTest';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/button-test" element={<ButtonTest />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
