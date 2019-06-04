import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {pessoa} from './pessoa.schema';
import {modalidadeRelacionamentoPessoal} from './modalidade-relacionamento-pessoal.schema';
import {origemDados} from './origem-dados.schema';

export const relacionamentoPessoal = new schema.Entity('relacionamentoPessoal', {
    pessoa: pessoa,
    pessoaRelacionada: pessoa,
    modalidadeRelacionamentoPessoal: modalidadeRelacionamentoPessoal,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
