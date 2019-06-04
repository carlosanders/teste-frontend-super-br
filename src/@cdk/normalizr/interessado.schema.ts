import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeInteressado} from './modalidade-interessado.schema';
import {pessoa} from './pessoa.schema';
import {processo} from './processo.schema';
import {origemDados} from './origem-dados.schema';

export const interessado = new schema.Entity('interessado', {
    processo: processo,
    pessoa: pessoa,
    modalidadeInteressado: modalidadeInteressado,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
