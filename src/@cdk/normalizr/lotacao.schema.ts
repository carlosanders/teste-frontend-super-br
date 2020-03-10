import {usuario} from './index.schema';
import {colaborador} from './index.schema';
import {setor} from './index.schema';
import {lotacao as lotacaoSchema} from './index.schema';

lotacaoSchema.define({
    colaborador: colaborador,
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const lotacao = lotacaoSchema;
