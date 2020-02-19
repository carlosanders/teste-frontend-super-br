import {usuario} from './usuario.schema';
import {modalidadeModelo as modalidadeModeloSchema} from './base.schema';

modalidadeModeloSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeModelo = modalidadeModeloSchema;
