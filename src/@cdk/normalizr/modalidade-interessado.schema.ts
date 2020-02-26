import {usuario} from './base.schema';
import {modalidadeInteressado as modalidadeInteressadoSchema} from './base.schema';

modalidadeInteressadoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeInteressado = modalidadeInteressadoSchema;
