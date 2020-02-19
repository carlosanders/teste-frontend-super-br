import {usuario} from './usuario.schema';
import {modalidadeTransicao} from './modalidade-transicao.schema';
import {transicao as transicaoSchema} from './base.schema';

transicaoSchema.define({
    modalidadeTransicao: modalidadeTransicao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const transicao = transicaoSchema;
