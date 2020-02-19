import {usuario} from './usuario.schema';
import {municipio} from './municipio.schema';
import {especieSetor} from './especie-setor.schema';
import {unidade} from './unidade.schema';
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
