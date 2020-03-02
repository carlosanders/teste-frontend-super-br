import {usuario} from './index.schema';
import {modalidadeCategoriaSigilo as modalidadeCategoriaSigiloSchema} from './index.schema';

modalidadeCategoriaSigiloSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeCategoriaSigilo = modalidadeCategoriaSigiloSchema;
