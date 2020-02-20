import {usuario} from './usuario.schema';
import {modalidadeDocumentoIdentificador as modalidadeDocumentoIdentificadorSchema} from './base.schema';

modalidadeDocumentoIdentificadorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeDocumentoIdentificador = modalidadeDocumentoIdentificadorSchema;
