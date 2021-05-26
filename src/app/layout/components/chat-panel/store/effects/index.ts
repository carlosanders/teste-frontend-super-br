import {ChatMercureEffects} from './chat-mercure.effect';
import {ChatEffects} from './chat.effect';
import {ChatMensagemEffects} from './chat-mensagem.effect';
import {ChatParticipanteEffect} from './chat-participante.effect';

export const effects: any[] = [
    ChatMercureEffects,
    ChatEffects,
    ChatMensagemEffects,
    ChatParticipanteEffect,
];

export * from './chat-mercure.effect';
export * from './chat.effect';
export * from './chat-mensagem.effect';
export * from './chat-participante.effect';
