import {RouterEffects} from './router.effect';
import {MercureEffects} from './mercure.effect';
import {CounterEffects} from './counter.effect';
import {NotificacaoEffect} from './notificacao.effects';

export const effects: any[] = [
    RouterEffects,
    MercureEffects,
    CounterEffects,
    NotificacaoEffect
];

export * from './router.effect';
export * from './mercure.effect';
export * from './counter.effect';
export * from './notificacao.effects';
