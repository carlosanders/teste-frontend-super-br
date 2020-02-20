import {usuario} from './base.schema';
import {role as roleSchema} from './base.schema';

roleSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const role = roleSchema;
