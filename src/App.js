import React, { useEffect, useState } from 'react';
import Nav from 'components/nav';
import Bookmarklets from 'contents/bookmarklets';
import JSbuild from 'contents/jsbuild';
import Links from 'contents/links';
import './App.css';


const App = () => {
  const [isWindowTopBarAdded, setIsWindowTopBarAdded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [authKey, setAuthKey] = useState('');
  const [activeSection, setActiveSection] = useState('bookmarklets');
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : prefersDarkTheme;
  });

  useEffect(() => {
    document.querySelectorAll("a").forEach(function (elem) {
        elem.setAttribute("target", "_blank");
    });
  
    document.body.classList.add('no-transition');
    requestAnimationFrame(() => {
      document.body.classList.remove('no-transition');
    }); 
    document.body.classList.toggle('theme-dark', isDarkTheme);
    document.body.classList.toggle('theme-light', !isDarkTheme);
    localStorage.setItem('theme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const changeSection = (content) => {
    setActiveSection(content);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const updateAuthKey = (key) => {
    setAuthKey(key);
  };

  useEffect(() => {
    if (!isWindowTopBarAdded) {
      const windowTopBar = document.createElement("div");
      windowTopBar.classList.add("window-top-bar");
      document.body.appendChild(windowTopBar);
      setIsWindowTopBarAdded(true);
    }
  }, [isWindowTopBarAdded]);

  return (
    <>
      <div className="layout">
        <Nav changeSection={changeSection} activeSection={activeSection} updateAuthKey={updateAuthKey} />
        {activeSection === 'bookmarklets' && (
          <Bookmarklets />
        )}
        {activeSection === 'links' && (
          <Links />
        )}
        {activeSection === 'jsbuild' && (
          <JSbuild />
        )}
      </div>
    </>
  );
};

export default App;
