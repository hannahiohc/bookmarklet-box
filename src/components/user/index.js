import React, { useEffect, useState } from 'react';
import { SignInModal } from 'components/modal';
import './style.css';

const User = ({ user, setUser, isModalVisible, setModalVisible, updateAuthKey }) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
    });

    const handleLogin = () => {
        setModalVisible(true);
    };

    const handleLogout = () => {
        setUser(null);
    };  

    const handleUserLogin = (username) => {
        setUser(username);
        setModalVisible(false); 
        console.log(username);
    };

    return (
        <div id="userContainer">
            {user ? (
                <ul className="signed-in">
                    <li>Signed in as<br /><span className="username">{user}</span></li>
                    <li><button onClick={handleLogout}>SIGN OUT</button></li>
                </ul>
            ) : (
                <ul className="sign-in">
                    <li>
                        <button onClick={handleLogin}>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            SIGN IN
                        </button>
                    </li>
                </ul>
            )}
            <SignInModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} onUserLogin={handleUserLogin} updateAuthKey={updateAuthKey} />
        </div>
    )
}

export default User;
