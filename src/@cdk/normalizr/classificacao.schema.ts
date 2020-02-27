import {classificacao as classificacaoSchema, modalidadeDestinacao, usuario} from './base.schema';

classificacaoSchema.define({
    modalidadeDestinacao: modalidadeDestinacao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const classificacao = classificacaoSchema;
