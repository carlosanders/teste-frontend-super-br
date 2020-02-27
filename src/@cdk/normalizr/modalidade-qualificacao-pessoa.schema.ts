import {usuario} from './base.schema';
import {modalidadeQualificacaoPessoa as modalidadeQualificacaoPessoaSchema} from './base.schema';

modalidadeQualificacaoPessoaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeQualificacaoPessoa = modalidadeQualificacaoPessoaSchema;
