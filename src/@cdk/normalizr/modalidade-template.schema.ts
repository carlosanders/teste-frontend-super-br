import {usuario} from './index.schema';
import {modalidadeTemplate as modalidadeTemplateSchema} from './index.schema';

modalidadeTemplateSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeTemplate = modalidadeTemplateSchema;
