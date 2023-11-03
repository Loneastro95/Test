import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default function App() {
  // State to manage chat messages
  const [messages, setMessages] = useState([]);

  // Set initial messages using useEffect hook
  useEffect(() => {
    setMessages([
      // Initial chat messages with quick reply options
      {
        _id: 1,
        text: 'Hi Ayanda how can we help  you ?',
        createdAt: new Date(),
        quickReplies: {
          type: 'radio',
          values: [
            {
              title: '😋 Electricity',
              value: 'Electricity',
            },
            {
              title: '📷 Water',
              value: 'Water',
            },
            {
              title: '😞 Housing',
              value: 'no',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 2,
        text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
        createdAt: new Date(),
        quickReplies: {
          type: 'checkbox',
          values: [
            {
              title: 'Yes',
              value: 'yes',
            },
            {
              title: 'Yes, let me show you with a picture!',
              value: 'yes_picture',
            },
            {
              title: 'Nope. What?',
              value: 'no',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  // Callback function to handle sending messages
  const onSend = useCallback((messages = []) => {
    const [message] = messages;
    if (message.quickReply) {
      // Handle quick reply
      const { value } = message.quickReply;
      let replyText;
      // Determine reply based on the selected quick reply option
      if (value === 'yes') {
        replyText = 'Thank you for loving Gifted Chat!';
      } else if (value === 'yes_picture') {
        replyText = 'Great! Show us your picture!';
      } else if (value === 'no') {
        replyText = 'We appreciate your feedback. What can we do to improve?';
      } else {
        replyText = 'Im testing';
      }
      // Create a reply message
      const replyMessage = {
        _id: Math.random(),
        text: replyText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      };
      // Update chat messages with the reply
      setMessages(previousMessages => [
        ...previousMessages,
        replyMessage,
      ]);
    } else {
      // Handle regular message
      // Append new messages to the chat messages
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
    }
  }, []);

  // Render the GiftedChat component with chat messages and event handlers
  return (
  <GiftedChat
  messages={messages}
  onSend={(newMessages) => onSend(newMessages)}
  user={{
    _id: 1, // user id
  }}
  onQuickReply={(reply) => {
    // Handle quick reply selection
    const { value } = reply[0];
    const replyMessage = {
      _id: Math.random(),
      text: `You selected: ${value}`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
      },
    };
    setMessages(previousMessages => [
      ...previousMessages,
      replyMessage,
    ]);
  }}
/>

  );
}
