import {schema} from '@cdk/normalizr-src';
import {usuario} from '@cdk/normalizr/index';

export const navio = new schema.Entity('modalidade-afastamento');

navio.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

