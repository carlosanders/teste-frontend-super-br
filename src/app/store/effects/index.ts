import { RouterEffects } from './router.effect';
import {MercureEffects} from './mercure.effect';

export const effects: any[] = [
    RouterEffects,
    MercureEffects
];

export * from './router.effect';
export * from './mercure.effect';
