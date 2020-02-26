import {usuario} from './base.schema';
import {municipio} from './base.schema';
import {especieSetor} from './base.schema';
import {unidade} from './base.schema';
import {setor as setorSchema} from './base.schema';

setorSchema.define({
    municipio: municipio,
    especieSetor: especieSetor,
    unidade: unidade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const setor = setorSchema;
