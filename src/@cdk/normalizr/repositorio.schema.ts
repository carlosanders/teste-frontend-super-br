import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {documento} from './documento.schema';
import {modalidadeRepositorio} from './modalidade-repositorio.schema';

export const repositorio = new schema.Entity('repositorio', {
    modalidadeRepositorio: modalidadeRepositorio,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
