import {schema} from '@cdk/normalizr-src';
import {modalidadeGarantia} from './modalidade-garantia.schema';
import {processo} from './processo.schema';
import {usuario} from './usuario.schema';


export const garantia = new schema.Entity('garantia', {
    processo: processo,
    modalidadeInteressado: modalidadeGarantia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

