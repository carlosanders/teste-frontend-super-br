import {usuario} from './base.schema';
import {modalidadeMeio as modalidadeMeioSchema} from './base.schema';

modalidadeMeioSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeMeio = modalidadeMeioSchema;
