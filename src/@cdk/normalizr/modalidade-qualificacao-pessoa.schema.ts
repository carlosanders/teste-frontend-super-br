import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeQualificacaoPessoa = new schema.Entity('modalidadeQualificacaoPessoa', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
