import {usuario} from './index.schema';
import {role as roleSchema} from './index.schema';

roleSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const role = roleSchema;
