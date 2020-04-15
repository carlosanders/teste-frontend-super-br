import {usuario, vinculacaoRepositorio} from './index.schema';
import {documento} from './index.schema';
import {modalidadeRepositorio} from './index.schema';
import {repositorio as repositorioSchema} from './index.schema';

repositorioSchema.define({
    modalidadeRepositorio: modalidadeRepositorio,
    documento: documento,
    vinculacaoRepositorio: vinculacaoRepositorio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const repositorio = repositorioSchema;
