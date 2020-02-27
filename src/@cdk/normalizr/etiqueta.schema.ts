import {usuario} from './usuario.schema';
import {modalidadeEtiqueta} from './modalidade-etiqueta.schema';
import {etiqueta as etiquetaSchema} from './base.schema';

etiquetaSchema.define({
    modalidadeEtiqueta: modalidadeEtiqueta,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const etiqueta = etiquetaSchema;
