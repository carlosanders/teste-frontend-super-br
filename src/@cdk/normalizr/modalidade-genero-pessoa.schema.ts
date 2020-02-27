import {usuario} from './base.schema';
import {modalidadeGeneroPessoa as modalidadeGeneroPessoaSchema} from './base.schema';

modalidadeGeneroPessoaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeGeneroPessoa = modalidadeGeneroPessoaSchema;
