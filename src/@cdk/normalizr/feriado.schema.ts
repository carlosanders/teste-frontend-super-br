import {usuario} from './usuario.schema';
import {estado} from './estado.schema';
import {municipio} from './municipio.schema';
import {feriado as feriadoSchema} from './base.schema';

feriadoSchema.define({
    municipio: municipio,
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const feriado = feriadoSchema;
