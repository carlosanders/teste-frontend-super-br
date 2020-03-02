import {usuario} from './index.schema';
import {modalidadeAfastamento as modalidadeAfastamentoSchema} from './index.schema';

modalidadeAfastamentoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeAfastamento = modalidadeAfastamentoSchema;

