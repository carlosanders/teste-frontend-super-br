import {setor} from './index.schema';
import {usuario} from './index.schema';
import {localizador as localizadorSchema} from './index.schema';

localizadorSchema.define({
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const localizador = localizadorSchema;
