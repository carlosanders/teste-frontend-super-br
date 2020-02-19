import {especieSetor} from './especie-setor.schema';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {repositorio} from './repositorio.schema';
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
