import {usuario} from './index.schema';
import {modalidadeRepresentante as modalidadeRepresentanteSchema} from './index.schema';

modalidadeRepresentanteSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeRepresentante = modalidadeRepresentanteSchema;
