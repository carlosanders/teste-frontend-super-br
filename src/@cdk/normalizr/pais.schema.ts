import {usuario} from './base.schema';
import {pais as paisSchema} from './base.schema';

paisSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const pais = paisSchema;

