import {usuario} from './index.schema';
import {modalidadeQualificacaoPessoa as modalidadeQualificacaoPessoaSchema} from './index.schema';

modalidadeQualificacaoPessoaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeQualificacaoPessoa = modalidadeQualificacaoPessoaSchema;
