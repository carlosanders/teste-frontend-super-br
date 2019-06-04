import {schema} from '@cdk/normalizr-src';
import {modalidadeDestinacao} from './modalidade-destinacao.schema';
import {usuario} from './usuario.schema';


export const classificacao = new schema.Entity('classificacao', {
    modalidadeDestinacao: modalidadeDestinacao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
