import {usuario} from './usuario.schema';
import {modalidadeVinculacaoDocumento} from './modalidade-vinculacao-documento.schema';
import {documentoVinculado} from './documento-vinculado.schema';
import {documento} from './documento.schema';
import {vinculacaoDocumento as vinculacaoDocumentoSchema} from './base.schema';

vinculacaoDocumentoSchema.define({
    documento: documento,
    documentoVinculado: documentoVinculado,
    modalidadeVinculacaoDocumento: modalidadeVinculacaoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoDocumento = vinculacaoDocumentoSchema;
