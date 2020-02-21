import {usuario} from './base.schema';
import {modalidadeDocumentoIdentificador} from './base.schema';
import {origemDados} from './base.schema';
import {documentoIdentificador as documentoIdentificadorSchema} from './base.schema';

documentoIdentificadorSchema.define({
    modalidadeDocumentoIdentificador: modalidadeDocumentoIdentificador,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const documentoIdentificador = documentoIdentificadorSchema;
