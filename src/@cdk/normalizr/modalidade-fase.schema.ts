import {usuario} from './index.schema';
import {modalidadeFase as modalidadeFaseSchema} from './index.schema';

modalidadeFaseSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeFase = modalidadeFaseSchema;
