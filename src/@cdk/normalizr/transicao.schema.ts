import {usuario} from './base.schema';
import {modalidadeTransicao} from './base.schema';
import {transicao as transicaoSchema} from './base.schema';

transicaoSchema.define({
    modalidadeTransicao: modalidadeTransicao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const transicao = transicaoSchema;
