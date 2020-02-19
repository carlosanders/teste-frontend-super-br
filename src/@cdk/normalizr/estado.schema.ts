import {pais} from './pais.schema';
import {usuario} from './usuario.schema';
import {estado as estadoSchema} from './base.schema';

estadoSchema.define({
    pais: pais,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const estado = estadoSchema;

