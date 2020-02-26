import {schema} from '@cdk/normalizr-src';
import {modalidadeGarantia} from './base.schema';
import {processo} from './base.schema';
import {usuario} from './base.schema';

export const garantia = new schema.Entity('garantia', {
    processo: processo,
    modalidadeGarantia: modalidadeGarantia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

