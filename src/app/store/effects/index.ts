import { RouterEffects } from './router.effect';
import {MercureEffects} from './mercure.effect';
import {NotificacaoEffect} from './notificacao.effects';

export const effects: any[] = [
    RouterEffects,
    MercureEffects,
    NotificacaoEffect
];

export * from './router.effect';
export * from './mercure.effect';
export * from './notificacao.effects';
