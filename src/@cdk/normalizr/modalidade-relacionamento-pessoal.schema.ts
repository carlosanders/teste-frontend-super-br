import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeRelacionamentoPessoal = new schema.Entity('modalidadeRelacionamentoPessoal', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
