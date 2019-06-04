import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeVinculacaoDocumento} from './modalidade-vinculacao-documento.schema';
import {documentoPai} from './documento-pai.schema';

export const vinculacaoDocumentoPrincipal = new schema.Entity('vinculacaoDocumentoPrincipal', {
    documento: documentoPai,
    modalidadeVinculacaoDocumento: modalidadeVinculacaoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
