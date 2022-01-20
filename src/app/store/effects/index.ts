import {RouterEffects} from './router.effect';
import {MercureEffects} from './mercure.effect';
import {CounterEffects} from './counter.effect';
import {NotificacaoEffect} from './notificacao.effects';
import {AssinaturaEffects} from './assinatura.effects';
import {AvaliacaoEffects} from './avaliacao.effects';

export const effects: any[] = [
    AssinaturaEffects,
    RouterEffects,
    MercureEffects,
    CounterEffects,
    NotificacaoEffect,
    AvaliacaoEffects
];

export * from './assinatura.effects';
export * from './router.effect';
export * from './mercure.effect';
export * from './counter.effect';
export * from './notificacao.effects';
export * from './avaliacao.effects';
