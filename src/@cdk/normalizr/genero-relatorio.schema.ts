import {usuario} from './index.schema';
import {generoRelatorio as generoRelatorioSchema} from './index.schema';

generoRelatorioSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoRelatorio = generoRelatorioSchema;
