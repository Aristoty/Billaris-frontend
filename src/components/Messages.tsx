// src/components/Messages.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthService } from './Auth/auth.service';
import { access } from 'fs';


const Messages: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);




    const token = window.localStorage.getItem("token");
    var access_token: string | null = null;

    if (token !== null) {
       access_token = token;
    } else {
       access_token = null;
    }
  

  
  
  

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8081/messages', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;



