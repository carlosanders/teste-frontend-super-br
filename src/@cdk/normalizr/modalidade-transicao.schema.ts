import {usuario} from './index.schema';
import {modalidadeTransicao as modalidadeTransicaoSchema} from './index.schema';

modalidadeTransicaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeTransicao = modalidadeTransicaoSchema;
