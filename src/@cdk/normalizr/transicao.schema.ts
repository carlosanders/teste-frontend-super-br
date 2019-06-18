import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeTransicao} from './modalidade-transicao.schema';

export const transicao = new schema.Entity('transicao', {
    modalidadeTransicao: modalidadeTransicao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
