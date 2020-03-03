import {estado} from './index.schema';
import {usuario} from './index.schema';
import {municipio as municipioSchema} from './index.schema';

municipioSchema.define({
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const municipio = municipioSchema;

