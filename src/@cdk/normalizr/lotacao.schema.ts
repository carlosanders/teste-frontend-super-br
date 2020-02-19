import {usuario} from './usuario.schema';
import {colaborador} from './colaborador.schema';
import {setor} from './setor.schema';
import {lotacao as lotacaoSchema} from './base.schema';

lotacaoSchema.define({
    colaborador: colaborador,
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const lotacao = lotacaoSchema;
