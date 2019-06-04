import {schema} from '@cdk/normalizr-src';
import {especieSetor} from './especie-setor.schema';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {repositorio} from './repositorio.schema';

export const vinculacaoRepositorio = new schema.Entity('vinculacaoRepositorio', {
    modelo: repositorio,
    especieSetor: especieSetor,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
