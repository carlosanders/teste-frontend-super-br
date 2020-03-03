import {usuario} from './index.schema';
import {generoSetor as generoSetorSchema} from './index.schema';

generoSetorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoSetor = generoSetorSchema;

