import {usuario} from './base.schema';
import {modalidadeTemplate as modalidadeTemplateSchema} from './base.schema';

modalidadeTemplateSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeTemplate = modalidadeTemplateSchema;
