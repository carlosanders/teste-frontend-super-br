import {usuario} from './base.schema';
import {documento} from './base.schema';
import {modalidadeRepositorio} from './base.schema';
import {repositorio as repositorioSchema} from './base.schema';

repositorioSchema.define({
    modalidadeRepositorio: modalidadeRepositorio,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const repositorio = repositorioSchema;
