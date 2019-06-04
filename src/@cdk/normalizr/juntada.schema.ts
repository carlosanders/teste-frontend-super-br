import {schema} from '@cdk/normalizr-src';
import {documento} from './documento.schema';
import {usuario} from './usuario.schema';
import {origemDados} from './origem-dados.schema';

export const juntada = new schema.Entity('juntada', {
    documento: documento,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
});
