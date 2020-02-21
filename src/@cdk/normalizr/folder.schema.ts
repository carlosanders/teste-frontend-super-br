import {usuario} from './base.schema';
import {modalidadeFolder} from './base.schema';
import {folder as folderSchema} from './base.schema';

folderSchema.define({
    modalidadeFolder: modalidadeFolder,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const folder = folderSchema;
