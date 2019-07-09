import {schema} from '@cdk/normalizr-src';
import {etiqueta} from './etiqueta.schema';
import {usuario} from './usuario.schema';

export const acao = new schema.Entity('acao', {
    etiqueta: etiqueta,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
