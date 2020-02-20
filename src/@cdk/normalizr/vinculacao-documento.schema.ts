import {usuario} from './usuario.schema';
import {modalidadeVinculacaoDocumento} from './modalidade-vinculacao-documento.schema';
import {documento} from './documento.schema';
import {vinculacaoDocumento as vinculacaoDocumentoSchema} from './base.schema';

vinculacaoDocumentoSchema.define({
    documento: documento,
    documentoVinculado: documento,
    modalidadeVinculacaoDocumento: modalidadeVinculacaoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoDocumento = vinculacaoDocumentoSchema;
