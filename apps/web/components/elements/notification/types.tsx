import { ArgsProps } from 'antd/lib/notification/interface';

export type NotificationTypes = 'success' | 'error' | 'info' | 'warning';

export interface NotificationProps extends ArgsProps {
  messageType: NotificationTypes;
  message: string;
  description: string;
}
