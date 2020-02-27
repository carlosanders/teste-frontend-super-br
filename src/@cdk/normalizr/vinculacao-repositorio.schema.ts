import {especieSetor} from './base.schema';
import {setor} from './base.schema';
import {usuario} from './base.schema';
import {repositorio} from './base.schema';
import {vinculacaoRepositorio as vinculacaoRepositorioSchema} from './base.schema';

vinculacaoRepositorioSchema.define({
    modelo: repositorio,
    especieSetor: especieSetor,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoRepositorio = vinculacaoRepositorioSchema;
