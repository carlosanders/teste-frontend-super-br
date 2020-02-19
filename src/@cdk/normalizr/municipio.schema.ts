import {estado} from './estado.schema';
import {usuario} from './usuario.schema';
import {municipio as municipioSchema} from './base.schema';

municipioSchema.define({
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const municipio = municipioSchema;

