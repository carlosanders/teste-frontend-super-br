import {municipio} from './index.schema';
import {setor} from './index.schema';
import {usuario} from './index.schema';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from './index.schema';

vinculacaoSetorMunicipioSchema.define({
    setor: setor,
    municipio: municipio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoSetorMunicipio = vinculacaoSetorMunicipioSchema;
