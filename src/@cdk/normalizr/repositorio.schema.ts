import {usuario} from './usuario.schema';
import {documento} from './documento.schema';
import {modalidadeRepositorio} from './modalidade-repositorio.schema';
import {repositorio as repositorioSchema} from './base.schema';

repositorioSchema.define({
    modalidadeRepositorio: modalidadeRepositorio,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const repositorio = repositorioSchema;
