import {usuario} from './index.schema';
import {modalidadeModelo as modalidadeModeloSchema} from './index.schema';

modalidadeModeloSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeModelo = modalidadeModeloSchema;
