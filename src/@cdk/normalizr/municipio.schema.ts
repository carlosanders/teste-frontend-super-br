import {schema} from '@cdk/normalizr-src';
import {estado} from './estado.schema';
import {usuario} from './usuario.schema';

export const municipio = new schema.Entity('municipio', {
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

