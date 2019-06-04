import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeOrgaoCentral = new schema.Entity('modalidadeOrgaoCentral', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
