import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {colaborador} from './colaborador.schema';
import {setor} from './setor.schema';

export const lotacao = new schema.Entity('lotacao', {
    colaborador: colaborador,
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
