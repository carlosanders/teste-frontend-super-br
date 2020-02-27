import {usuario} from './usuario.schema';
import {modalidadeDocumentoIdentificador} from './modalidade-documento-identificador.schema';
import {origemDados} from './origem-dados.schema';
import {documentoIdentificador as documentoIdentificadorSchema} from './base.schema';

documentoIdentificadorSchema.define({
    modalidadeDocumentoIdentificador: modalidadeDocumentoIdentificador,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const documentoIdentificador = documentoIdentificadorSchema;
