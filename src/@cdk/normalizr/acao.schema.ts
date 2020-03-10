import {acao as acaoSchema} from './index.schema';
import {usuario} from './index.schema';


acaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const acao = acaoSchema;
