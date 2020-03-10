import {usuario} from './index.schema';
import {modalidadeTransicao} from './index.schema';
import {transicao as transicaoSchema} from './index.schema';

transicaoSchema.define({
    modalidadeTransicao: modalidadeTransicao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const transicao = transicaoSchema;
