import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeRepresentante} from './modalidade-representante.schema';
import {origemDados} from './origem-dados.schema';
import {interessado} from './interessado.schema';

export const representante = new schema.Entity('representante', {
    modalidadeRepresentante: modalidadeRepresentante,
    interessado: interessado,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
