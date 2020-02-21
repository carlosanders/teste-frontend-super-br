import {usuario} from './base.schema';
import {colaborador} from './base.schema';
import {setor} from './base.schema';
import {lotacao as lotacaoSchema} from './base.schema';

lotacaoSchema.define({
    colaborador: colaborador,
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const lotacao = lotacaoSchema;
