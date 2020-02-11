import {schema} from '@cdk/normalizr-src';
import {garantiaAdministrativo} from './garantia-administrativo.schema';
import {processo} from './processo.schema';
import {origemDados} from './origem-dados.schema';
import {usuario} from './usuario.schema';


export const garantia = new schema.Entity('garantia', {
    garantiaAdministrativo: garantiaAdministrativo,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

