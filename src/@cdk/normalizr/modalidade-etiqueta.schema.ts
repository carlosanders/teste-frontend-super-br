import {usuario} from './base.schema';
import {modalidadeEtiqueta as modalidadeEtiquetaSchema} from './base.schema';

modalidadeEtiquetaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeEtiqueta = modalidadeEtiquetaSchema;
