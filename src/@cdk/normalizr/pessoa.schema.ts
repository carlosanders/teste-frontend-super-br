import {pais} from './base.schema';
import {modalidadeGeneroPessoa} from './base.schema';
import {modalidadeQualificacaoPessoa} from './base.schema';
import {municipio} from './base.schema';
import {origemDados} from './base.schema';
import {usuario} from './base.schema';
import {pessoa as pessoaSchema} from './base.schema';

pessoaSchema.define({
    nacionalidade: pais,
    modalidadeGeneroPessoa: modalidadeGeneroPessoa,
    naturalidade: municipio,
    modalidadeQualificacaoPessoa: modalidadeQualificacaoPessoa,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const pessoa = pessoaSchema;
