import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {pessoa} from './pessoa.schema';
import {municipio} from './municipio.schema';
import {origemDados} from './origem-dados.schema';
import {pais} from './pais.schema';

export const endereco = new schema.Entity('endereco', {
    municipio: municipio,
    pais: pais,
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
