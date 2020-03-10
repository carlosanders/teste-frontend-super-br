import {pais} from './index.schema';
import {modalidadeGeneroPessoa} from './index.schema';
import {modalidadeQualificacaoPessoa} from './index.schema';
import {municipio} from './index.schema';
import {origemDados} from './index.schema';
import {usuario} from './index.schema';
import {pessoa as pessoaSchema} from './index.schema';

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
