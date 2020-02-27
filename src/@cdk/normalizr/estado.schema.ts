import {pais} from './base.schema';
import {usuario} from './base.schema';
import {estado as estadoSchema} from './base.schema';

estadoSchema.define({
    pais: pais,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const estado = estadoSchema;

