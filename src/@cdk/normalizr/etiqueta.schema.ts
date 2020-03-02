import {usuario} from './index.schema';
import {modalidadeEtiqueta} from './index.schema';
import {etiqueta as etiquetaSchema} from './index.schema';

etiquetaSchema.define({
    modalidadeEtiqueta: modalidadeEtiqueta,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const etiqueta = etiquetaSchema;
