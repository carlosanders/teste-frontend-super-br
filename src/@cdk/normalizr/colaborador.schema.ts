import {schema} from '@cdk/normalizr-src';
import {cargo} from './cargo.schema';
import {modalidadeColaborador} from './modalidade-colaborador.schema';
import {usuario} from './usuario.schema';

export const colaborador = new schema.Entity('colaborador', {
    cargo: cargo,
    modalidadeColaborador: modalidadeColaborador,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
