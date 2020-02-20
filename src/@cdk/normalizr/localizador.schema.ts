import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {localizador as localizadorSchema} from './base.schema';

localizadorSchema.define({
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const localizador = localizadorSchema;
