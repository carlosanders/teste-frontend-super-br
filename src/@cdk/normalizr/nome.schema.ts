import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {pessoa} from './pessoa.schema';
import {origemDados} from './origem-dados.schema';

export const nome = new schema.Entity('nome', {
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
