import {RouterEffects} from './router.effect';
import {MercureEffects} from './mercure.effect';
import {CounterEffects} from './counter.effect';

export const effects: any[] = [
    RouterEffects,
    MercureEffects,
    CounterEffects,
];

export * from './router.effect';
export * from './mercure.effect';
export * from './counter.effect';
