import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const garantiaAdministrativo = new schema.Entity('garantiaAdministrativo', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

