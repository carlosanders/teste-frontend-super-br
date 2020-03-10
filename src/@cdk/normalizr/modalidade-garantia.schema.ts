import {schema} from '@cdk/normalizr-src';
import {usuario} from './index.schema';

export const modalidadeGarantia = new schema.Entity('modalidadeGarantia', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});