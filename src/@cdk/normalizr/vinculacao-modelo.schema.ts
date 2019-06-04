import {schema} from '@cdk/normalizr-src';
import {modelo} from './modelo.schema';
import {especieSetor} from './especie-setor.schema';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';

export const vinculacaoModelo = new schema.Entity('vinculacaoModelo', {
    modelo: modelo,
    especieSetor: especieSetor,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
