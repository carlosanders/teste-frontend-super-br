import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeVinculacaoDocumento} from './modalidade-vinculacao-documento.schema';
import {documentoVinculado} from './documento-vinculado.schema';
import {documento} from './documento.schema';

export const vinculacaoDocumento = new schema.Entity('vinculacaoDocumento', {
    documento: documento,
    documentoVinculado: documentoVinculado,
    modalidadeVinculacaoDocumento: modalidadeVinculacaoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
