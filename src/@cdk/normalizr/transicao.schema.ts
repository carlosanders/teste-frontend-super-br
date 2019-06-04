import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeTransicao} from './modalidade-transicao.schema';
import {processo} from './processo.schema';

export const transicao = new schema.Entity('transicao', {
    processo: processo,
    modalidadeTransicao: modalidadeTransicao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
