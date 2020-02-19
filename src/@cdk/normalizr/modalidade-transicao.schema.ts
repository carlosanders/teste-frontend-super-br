import {usuario} from './usuario.schema';
import {modalidadeTransicao as modalidadeTransicaoSchema} from './base.schema';

modalidadeTransicaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeTransicao = modalidadeTransicaoSchema;
