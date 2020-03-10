import {usuario} from './index.schema';
import {pais as paisSchema} from './index.schema';

paisSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const pais = paisSchema;

