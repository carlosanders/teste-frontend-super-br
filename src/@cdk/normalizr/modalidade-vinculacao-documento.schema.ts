import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeVinculacaoDocumento = new schema.Entity('modalidadeVinculacaoDocumento', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
