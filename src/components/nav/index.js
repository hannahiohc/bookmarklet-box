import React, { useState } from 'react';
import User from 'components/user';
import './style.css';

const Nav = ({ changeSection, activeSection, setIsDarkTheme, updateAuthKey }) => {
    const [isModalVisible, setModalVisible] = useState(false); 
    const [isUserVisible, setUserVisible] = useState(false);
    const [user, setUser] = useState(null);

    const toggleUser = () => {
        setUserVisible((prevVisibility) => !prevVisibility);
    }; 

    return (
        <div className="sidebar">
            <nav>
                <button className={`nav-button ${activeSection === 'bookmarklets' ? 'navActive' : ''}`} onClick={() => changeSection("bookmarklets")}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    BOOKMARKLETS
                </button> 
                <button className={`nav-button ${activeSection === 'links' ? 'navActive' : ''}`} onClick={() => changeSection("links")}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    LINKS
                </button>
                <button className={`nav-button ${activeSection === 'jsbuild' ? 'navActive' : ''}`} onClick={() => changeSection("jsbuild")}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                    JS-BUILD
                </button>
                {/* <User onClick={toggleUser} user={user} setUser={setUser} setIsDarkTheme={setIsDarkTheme} isModalVisible={isModalVisible} setModalVisible={setModalVisible} updateAuthKey={updateAuthKey} /> */}
            </nav>
            
        </div>
    );
};

export default Nav;