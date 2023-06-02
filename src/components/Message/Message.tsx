import React from 'react';

import styles from './Message.module.scss';

export interface IMessageProps {
  text: string;
}

const Message: React.FC<IMessageProps> = ({ text }) => {
  return <div className={styles.message}>{text}</div>;
};

export default Message;
