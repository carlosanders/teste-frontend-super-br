import {usuario} from './index.schema';
import {modalidadeInteressado as modalidadeInteressadoSchema} from './index.schema';

modalidadeInteressadoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeInteressado = modalidadeInteressadoSchema;
