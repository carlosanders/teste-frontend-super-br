import {usuario} from './base.schema';
import {estado} from './base.schema';
import {municipio} from './base.schema';
import {feriado as feriadoSchema} from './base.schema';

feriadoSchema.define({
    municipio: municipio,
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const feriado = feriadoSchema;
