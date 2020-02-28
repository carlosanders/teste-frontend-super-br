import {usuario} from './index.schema';
import {modalidadeMeio as modalidadeMeioSchema} from './index.schema';

modalidadeMeioSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeMeio = modalidadeMeioSchema;
