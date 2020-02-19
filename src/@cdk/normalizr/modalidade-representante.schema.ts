import {usuario} from './usuario.schema';
import {modalidadeRepresentante as modalidadeRepresentanteSchema} from './base.schema';

modalidadeRepresentanteSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeRepresentante = modalidadeRepresentanteSchema;
