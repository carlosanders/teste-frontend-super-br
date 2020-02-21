import {usuario} from './base.schema';
import {modalidadeCategoriaSigilo as modalidadeCategoriaSigiloSchema} from './base.schema';

modalidadeCategoriaSigiloSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeCategoriaSigilo = modalidadeCategoriaSigiloSchema;
