import {usuario} from './index.schema';
import {modalidadeFolder} from './index.schema';
import {folder as folderSchema} from './index.schema';

folderSchema.define({
    modalidadeFolder: modalidadeFolder,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const folder = folderSchema;
