import {usuario} from './base.schema';
import {modalidadeFase as modalidadeFaseSchema} from './base.schema';

modalidadeFaseSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeFase = modalidadeFaseSchema;
