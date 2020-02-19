import {usuario} from './usuario.schema';
import {modalidadeRepositorio as modalidadeRepositorioSchema} from './base.schema';

modalidadeRepositorioSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeRepositorio = modalidadeRepositorioSchema;
