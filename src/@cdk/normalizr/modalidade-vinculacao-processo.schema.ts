import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeVinculacaoProcesso = new schema.Entity('modalidadeVinculacaoProcesso', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
