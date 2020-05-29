import {generoRelatorio} from './index.schema';
import {usuario} from './index.schema';
import {especieRelatorio as especieRelatorioSchema} from './index.schema';

especieRelatorioSchema.define({
    generoRelatorio: generoRelatorio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieRelatorio = especieRelatorioSchema;
