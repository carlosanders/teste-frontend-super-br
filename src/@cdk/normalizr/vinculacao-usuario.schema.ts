import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const vinculacaoUsuario = new schema.Entity('vinculacaoUsuario', {
    usuario: usuario,
    usuarioVinculado: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
