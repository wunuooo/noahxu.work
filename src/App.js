// src/App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './components/WorkDetail';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './components/BlogDetail';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { ReactLenis } from 'lenis/react';
import CustomCursor from "./utils/CustomMouse";
import { ModelLoadingState } from './utils/ModelLoadingState';
// import { BackgroundCanvas } from './utils/BackgroundCanvas';


// 处理路由变化和模型加载状态
const AppContent = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);



  // useEffect(() => {
  //   // 初始化背景动画，只运行一次
  //   BackgroundCanvas();
  // }, []);

  useEffect(() => {
    // 当路由变化时，重置模型加载状态，回到主页面重新加载Loader
    if (location.pathname !== '/') {
      ModelLoadingState.setLoadingState(false);
    }
    else {
      setShowLoader(true);
    }
  }, [location.pathname]);

  const lenisOptions = {
    enabled: ModelLoadingState.isModelsLoaded,
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    smoothWheel: true,
    touchMultiplier: 2,
    lerp: 0.01
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {showLoader && <Loader onLoadComplete={() => setShowLoader(false)} />}
      <div className="flex flex-col">
        <CustomCursor />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:category" element={<Works />} />
            <Route path="/works/:category/:id" element={<WorkDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
};

// 主App组件现在只负责提供Router上下文
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
