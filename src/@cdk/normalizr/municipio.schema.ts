import {estado} from './base.schema';
import {usuario} from './base.schema';
import {municipio as municipioSchema} from './base.schema';

municipioSchema.define({
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const municipio = municipioSchema;

