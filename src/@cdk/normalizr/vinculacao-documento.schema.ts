import {usuario} from './index.schema';
import {modalidadeVinculacaoDocumento} from './index.schema';
import {documento} from './index.schema';
import {vinculacaoDocumento as vinculacaoDocumentoSchema} from './index.schema';

vinculacaoDocumentoSchema.define({
    documento: documento,
    documentoVinculado: documento,
    modalidadeVinculacaoDocumento: modalidadeVinculacaoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoDocumento = vinculacaoDocumentoSchema;
