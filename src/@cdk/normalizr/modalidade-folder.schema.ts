import {usuario} from './index.schema';
import {modalidadeFolder as modalidadeFolderSchema} from './index.schema';

modalidadeFolderSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeFolder = modalidadeFolderSchema;
