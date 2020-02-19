import {usuario} from './usuario.schema';
import {modalidadeFolder} from './modalidade-folder.schema';
import {folder as folderSchema} from './base.schema';

folderSchema.define({
    modalidadeFolder: modalidadeFolder,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const folder = folderSchema;
