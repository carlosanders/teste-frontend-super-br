import {setor} from './base.schema';
import {usuario} from './base.schema';
import {localizador as localizadorSchema} from './base.schema';

localizadorSchema.define({
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const localizador = localizadorSchema;
