import {acao as acaoSchema} from './base.schema';
import {usuario} from './base.schema';

acaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const acao = acaoSchema;
