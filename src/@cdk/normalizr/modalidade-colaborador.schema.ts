import {usuario} from './base.schema';
import {modalidadeColaborador as modalidadeColaboradorSchema} from './base.schema';

modalidadeColaboradorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeColaborador = modalidadeColaboradorSchema;

