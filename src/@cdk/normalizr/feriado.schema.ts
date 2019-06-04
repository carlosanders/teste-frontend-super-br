import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {estado} from './estado.schema';
import {municipio} from './municipio.schema';

export const feriado = new schema.Entity('feriado', {
    municipio: municipio,
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
