import {schema} from '@cdk/normalizr-src';
import {origemDados} from './origem-dados.schema';
import {pessoa} from './pessoa.schema';
import {usuario} from './usuario.schema';

export const cadastroIdentificador = new schema.Entity('cadastroIdentificador', {
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
