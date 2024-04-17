import React, { useCallback, useState } from 'react';
import { Octokit } from '@octokit/rest';
import './style.css'

const Modal = ({ isModalVisibnle, setIsModalVisible, title, onClose, children }) => {
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    if (onClose) {
      onClose();
    }
  }, [setIsModalVisible, onClose]);

  if (isModalVisibnle) {
    return (
      <div id="overlay" onClick={closeModal}> 
        <div id="modalContainer" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>✕</button>
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    )
  } else {
    return null;
  }
};

const SignInModal =  ({ isModalVisible, setModalVisible, updateAuthKey }) => {
  const [authKey, setAuthKey] = useState('');
  const [authError, setAuthError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!authKey) {
      setAuthError('Please enter a valid auth key');
      return;
    }

    const octokit = new Octokit({ 
      baseUrl: "",
      auth: authKey 
    });

    try {
      await octokit.request("GET /user");
      setAuthError('');
      updateAuthKey(authKey);
      setAuthKey('');
      setModalVisible(false);
    } catch (e) {
      console.error(e);
      setAuthError('Invalid Github Key. Please try again.');
    }
  };

  return (
    <Modal isModalVisibnle={isModalVisible} setIsModalVisible={setModalVisible} title="Sign In" onClose={() => setAuthError('')}>
      <form className="auth-form" onSubmit={handleFormSubmit}>
        <input className="auth-input auth-key" name="authkey" placeholder="GitHub Auth Key" value={authKey} onChange={(e) => setAuthKey(e.target.value)} required />
        <input className="auth-input auth-submit" type="submit" value="Sign In" />
      </form>
      <span className="auth-error">{authError}</span>
      <a href="" target="_blank" rel="noreferrer" className="auth-howto">How to get your Github Auth Key</a>
    </Modal>
  );
};

const PostModal = ({ isModalVisible, setModalVisible, postData }) => {
  const [text, setText] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData(text);
    setModalVisible(false);
  };

  return (
    <Modal isModalVisibnle={isModalVisible} setIsModalVisible={setModalVisible} title="Create a Post">
      <form className="post-form" onSubmit={handleFormSubmit}>
        <textarea className="post-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your post..." required />
        <input className="post-submit" type="submit" value="Post" />
      </form>
    </Modal>
  )
}

export { SignInModal, PostModal };