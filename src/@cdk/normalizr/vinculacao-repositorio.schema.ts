import {especieSetor, modalidadeOrgaoCentral} from './index.schema';
import {setor} from './index.schema';
import {usuario} from './index.schema';
import {repositorio} from './index.schema';
import {vinculacaoRepositorio as vinculacaoRepositorioSchema} from './index.schema';

vinculacaoRepositorioSchema.define({
    modelo: repositorio,
    especieSetor: especieSetor,
    orgaoCentral: modalidadeOrgaoCentral,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoRepositorio = vinculacaoRepositorioSchema;
