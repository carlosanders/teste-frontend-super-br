import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const acao = new schema.Entity('acao', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
