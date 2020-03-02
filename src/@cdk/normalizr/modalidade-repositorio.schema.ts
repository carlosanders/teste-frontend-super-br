import {usuario} from './index.schema';
import {modalidadeRepositorio as modalidadeRepositorioSchema} from './index.schema';

modalidadeRepositorioSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeRepositorio = modalidadeRepositorioSchema;
