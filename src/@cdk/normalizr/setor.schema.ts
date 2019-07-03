import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {municipio} from './municipio.schema';
import {especieSetor} from './especie-setor.schema';
import {unidade} from './unidade.schema';

export const setor = new schema.Entity('setor', {
    municipio: municipio,
    especieSetor: especieSetor,
    unidade: unidade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
