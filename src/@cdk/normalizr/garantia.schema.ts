import {schema} from '@cdk/normalizr-src';
import {modalidadeGarantia} from './index.schema';
import {processo} from './index.schema';
import {usuario} from './index.schema';

export const garantia = new schema.Entity('garantia', {
    processo: processo,
    modalidadeGarantia: modalidadeGarantia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

