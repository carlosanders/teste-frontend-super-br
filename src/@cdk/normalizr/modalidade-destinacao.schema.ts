import {usuario} from './index.schema';
import {modalidadeDestinacao as modalidadeDestinacaoSchema} from './index.schema';

modalidadeDestinacaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeDestinacao = modalidadeDestinacaoSchema;
