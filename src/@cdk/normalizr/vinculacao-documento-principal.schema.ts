import {usuario} from './usuario.schema';
import {modalidadeVinculacaoDocumento} from './modalidade-vinculacao-documento.schema';
import {documentoPai} from './documento-pai.schema';
import {vinculacaoDocumentoPrincipal as vinculacaoDocumentoPrincipalSchema} from './base.schema';

vinculacaoDocumentoPrincipalSchema.define({
    documento: documentoPai,
    modalidadeVinculacaoDocumento: modalidadeVinculacaoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoDocumentoPrincipal = vinculacaoDocumentoPrincipalSchema;
