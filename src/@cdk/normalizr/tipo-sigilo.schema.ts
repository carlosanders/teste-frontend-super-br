import {usuario} from './base.schema';
import {tipoSigilo as tipoSigiloSchema} from './base.schema';

tipoSigiloSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const tipoSigilo = tipoSigiloSchema;
