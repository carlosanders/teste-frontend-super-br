import {schema} from '@cdk/normalizr-src';
import {pais} from './pais.schema';
import {modalidadeGeneroPessoa} from './modalidade-genero-pessoa.schema';
import {modalidadeQualificacaoPessoa} from './modalidade-qualificacao-pessoa.schema';
import {municipio} from './municipio.schema';
import {origemDados} from './origem-dados.schema';
import {usuario} from './usuario.schema';


export const pessoa = new schema.Entity('pessoa', {
    nacionalidade: pais,
    modalidadeGeneroPessoa: modalidadeGeneroPessoa,
    naturalidade: municipio,
    modalidadeQualificacaoPessoa: modalidadeQualificacaoPessoa,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
