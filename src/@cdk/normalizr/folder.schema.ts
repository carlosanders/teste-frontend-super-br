import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeFolder} from './modalidade-folder.schema';

export const folder = new schema.Entity('folder', {
    modalidadeFolder: modalidadeFolder,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
