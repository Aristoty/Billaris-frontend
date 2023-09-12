// src/pages/MessagesPage.tsx
import React from 'react';
import Messages from '../components/Messages';
import { useNavigate } from 'react-router-dom';
import {  } from '../components/Auth/auth.service';

const MessagesPage: React.FC = () => {

  const navigate = useNavigate();

 


  return (
    <div className="container">
      <h1>Contenu des Messages</h1>
      <Messages />
    </div>
  );
};

export default MessagesPage;
