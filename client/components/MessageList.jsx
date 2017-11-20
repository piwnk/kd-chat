import React from 'react';
import PropTypes from 'prop-types';

import styles from '../style/MessageList.css';

const Message = ({ from, text }) => (
  <div className={styles.Message}>
    <strong>{from} :</strong>
    <span>{text}</span>
  </div>
);

Message.propTypes = {
  from: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const MessageList = ({ messages }) => (
  <div className={styles.MessageList}>
    {messages.map((message, i) => (
      <Message
        key={i}
        from={message.from}
        text={message.text}
      />
    ))}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageList;
