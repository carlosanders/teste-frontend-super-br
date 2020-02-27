import {usuario} from './index.schema';
import {modalidadeGeneroPessoa as modalidadeGeneroPessoaSchema} from './index.schema';

modalidadeGeneroPessoaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeGeneroPessoa = modalidadeGeneroPessoaSchema;
