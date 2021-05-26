import { Notification } from 'notification/notification';

const notification = new Notification();
notification.module = () => import('notification/relatorio/relatorio.module').then(m => m.RelatorioModule);
notification.order = 1;
notification.config = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['notificacao-snackbar']
};

export const notificationConfig =
    [
        notification
    ];
