import {usuario} from './index.schema';
import {estado} from './index.schema';
import {municipio} from './index.schema';
import {feriado as feriadoSchema} from './index.schema';

feriadoSchema.define({
    municipio: municipio,
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const feriado = feriadoSchema;
