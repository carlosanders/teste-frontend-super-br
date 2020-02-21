import {usuario} from './base.schema';
import {modalidadeAfastamento as modalidadeAfastamentoSchema} from './base.schema';

modalidadeAfastamentoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeAfastamento = modalidadeAfastamentoSchema;

