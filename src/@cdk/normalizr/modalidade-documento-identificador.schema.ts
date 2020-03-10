import {usuario} from './index.schema';
import {modalidadeDocumentoIdentificador as modalidadeDocumentoIdentificadorSchema} from './index.schema';

modalidadeDocumentoIdentificadorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeDocumentoIdentificador = modalidadeDocumentoIdentificadorSchema;
