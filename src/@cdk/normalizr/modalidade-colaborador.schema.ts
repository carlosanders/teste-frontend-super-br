import {usuario} from './index.schema';
import {modalidadeColaborador as modalidadeColaboradorSchema} from './index.schema';

modalidadeColaboradorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeColaborador = modalidadeColaboradorSchema;

