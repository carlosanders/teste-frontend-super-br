import {usuario} from './usuario.schema';
import {modalidadeDestinacao as modalidadeDestinacaoSchema} from './base.schema';

modalidadeDestinacaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeDestinacao = modalidadeDestinacaoSchema;
