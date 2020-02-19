import {usuario} from './usuario.schema';
import {modalidadeVinculacaoDocumento as modalidadeVinculacaoDocumentoSchema} from './base.schema';

modalidadeVinculacaoDocumentoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeVinculacaoDocumento = modalidadeVinculacaoDocumentoSchema;
