import {usuario} from './usuario.schema';
import {origemDados as origemDadosSchema} from './base.schema';

origemDadosSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const origemDados = origemDadosSchema;

