import {usuario} from './index.schema';
import {modalidadeVinculacaoDocumento as modalidadeVinculacaoDocumentoSchema} from './index.schema';

modalidadeVinculacaoDocumentoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeVinculacaoDocumento = modalidadeVinculacaoDocumentoSchema;
