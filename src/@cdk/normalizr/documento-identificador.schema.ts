import {usuario} from './index.schema';
import {modalidadeDocumentoIdentificador} from './index.schema';
import {origemDados} from './index.schema';
import {documentoIdentificador as documentoIdentificadorSchema} from './index.schema';

documentoIdentificadorSchema.define({
    modalidadeDocumentoIdentificador: modalidadeDocumentoIdentificador,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const documentoIdentificador = documentoIdentificadorSchema;
