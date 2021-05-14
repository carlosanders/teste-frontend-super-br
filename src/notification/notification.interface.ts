import { Notificacao } from '@cdk/models';

export interface NotificationInterface {
    supports(notification?: Notificacao): boolean;
}
