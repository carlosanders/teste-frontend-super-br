import {schema} from '@cdk/normalizr-src';
import {componenteDigital} from './componente-digital.schema';
import {origemDados} from './origem-dados.schema';
import {usuario} from './usuario.schema';

export const assinatura = new schema.Entity('assinatura', {
    componenteDigital: componenteDigital,
    origemDados: origemDados,
    usuario: usuario
});

