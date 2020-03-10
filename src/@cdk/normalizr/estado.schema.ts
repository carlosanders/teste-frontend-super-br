import {pais} from './index.schema';
import {usuario} from './index.schema';
import {estado as estadoSchema} from './index.schema';

estadoSchema.define({
    pais: pais,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const estado = estadoSchema;

