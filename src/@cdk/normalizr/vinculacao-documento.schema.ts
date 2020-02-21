import {usuario} from './base.schema';
import {modalidadeVinculacaoDocumento} from './base.schema';
import {documento} from './base.schema';
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
