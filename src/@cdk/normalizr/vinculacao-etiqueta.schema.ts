import {schema} from '@cdk/normalizr-src';
import {etiqueta} from './etiqueta.schema';
import {usuario} from './usuario.schema';

export const vinculacaoEtiqueta = new schema.Entity('vinculacaoEtiqueta', {
    etiqueta: etiqueta,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
