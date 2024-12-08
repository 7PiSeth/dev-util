import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import ExtractInformationFromQRCode from './components/ExtractInformationFromQRCode';
import EncloseValueInSingleQuotes from './components/EncloseValueInSingleQuotes';
import Home from './components/Home';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 200, anchorPlacement: 'top-bottom' });
  }, []);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      const op1 = document.getElementById('op1');
      const op2 = document.getElementById('op2');
      if (op1) op1.setAttribute('inputMode', 'none');
      if (op2) op2.setAttribute('inputMode', 'none');
    }
  }, []);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ExtractInformationFromQRCode" element={<ExtractInformationFromQRCode />} />
        <Route path="EncloseValueInSingleQuotes" element={<EncloseValueInSingleQuotes />} />
      </Routes>
      <Footer className="max-sm:hidden" />
    </Router>
  );
};

export default App;