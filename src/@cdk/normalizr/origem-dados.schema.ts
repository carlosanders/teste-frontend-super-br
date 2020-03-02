import {usuario} from './index.schema';
import {origemDados as origemDadosSchema} from './index.schema';

origemDadosSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const origemDados = origemDadosSchema;

