import { notification as antdNotification } from 'antd/lib';
import { NotificationProps, NotificationTypes } from './types';

const getNotificationStyle = (type: NotificationTypes) => {
  return {
    success: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1.5px solid #b7eb8f',
      backgroundColor: '#f6ffed',
    },
    warning: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1.5px solid #ffe58f',
      backgroundColor: '#fffbe6',
    },
    error: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1.5px solid #ffa39e',
      backgroundColor: '#fff1f0',
    },
    info: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1.5px solid #91d5ff',
      backgroundColor: '#e6f7ff',
    },
  }[type];
};
export function notification({
  message,
  messageType,
  description,
}: NotificationProps) {
  antdNotification.open({
    message: message,
    description: description,
    duration: 4,
    style: getNotificationStyle(messageType),
  });
}
