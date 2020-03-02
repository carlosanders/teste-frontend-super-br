import {usuario} from './index.schema';
import {tipoSigilo as tipoSigiloSchema} from './index.schema';

tipoSigiloSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const tipoSigilo = tipoSigiloSchema;
