import {ChatMercureEffects} from './chat-mercure.effect';
import {ChatEffects} from './chat.effect';
import {ChatMensagemEffects} from './chat-mensagem.effect';

export const effects: any[] = [
    ChatMercureEffects,
    ChatEffects,
    ChatMensagemEffects
];

export * from './chat-mercure.effect';
export * from './chat.effect';
export * from './chat-mensagem.effect';
