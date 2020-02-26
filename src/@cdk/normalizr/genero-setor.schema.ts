import {usuario} from './base.schema';
import {generoSetor as generoSetorSchema} from './base.schema';

generoSetorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoSetor = generoSetorSchema;

