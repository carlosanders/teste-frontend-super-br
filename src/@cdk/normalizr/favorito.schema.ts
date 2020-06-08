import {usuario} from './index.schema';
import {favorito as favoritoSchema} from './index.schema';

favoritoSchema.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const favorito = favoritoSchema;
