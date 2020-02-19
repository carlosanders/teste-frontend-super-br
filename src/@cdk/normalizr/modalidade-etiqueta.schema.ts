import {usuario} from './usuario.schema';
import {modalidadeEtiqueta as modalidadeEtiquetaSchema} from './base.schema';

modalidadeEtiquetaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeEtiqueta = modalidadeEtiquetaSchema;
