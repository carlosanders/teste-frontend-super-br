import {schema} from '@cdk/normalizr-src';
import {documento} from './documento.schema';
import {usuario} from './usuario.schema';

export const areaTrabalho = new schema.Entity('areaTrabalho', {
    documento: documento,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

