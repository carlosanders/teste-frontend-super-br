import {usuario} from './base.schema';
import {modalidadeFolder as modalidadeFolderSchema} from './base.schema';

modalidadeFolderSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeFolder = modalidadeFolderSchema;
