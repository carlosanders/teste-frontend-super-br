import {usuario} from './base.schema';
import {modalidadeEtiqueta} from './base.schema';
import {etiqueta as etiquetaSchema} from './base.schema';

etiquetaSchema.define({
    modalidadeEtiqueta: modalidadeEtiqueta,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const etiqueta = etiquetaSchema;
