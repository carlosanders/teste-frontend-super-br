import {usuario} from './index.schema';
import {modalidadeEtiqueta as modalidadeEtiquetaSchema} from './index.schema';

modalidadeEtiquetaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeEtiqueta = modalidadeEtiquetaSchema;
