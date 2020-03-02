import {usuario} from './index.schema';
import {municipio} from './index.schema';
import {especieSetor} from './index.schema';
import {unidade} from './index.schema';
import {setor as setorSchema} from './index.schema';

setorSchema.define({
    municipio: municipio,
    especieSetor: especieSetor,
    unidade: unidade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const setor = setorSchema;
