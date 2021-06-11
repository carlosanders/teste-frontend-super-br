import { Notification } from 'notification/notification';

const notification = new Notification();
notification.module = () => import('notification/default/default.module').then(m => m.DefaultModule);
notification.order = 999;
notification.config = {
    duration: 15000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['notificacao-snackbar']
};

export const notificationConfig = [notification];
