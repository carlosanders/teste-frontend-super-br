import {usuario} from './base.schema';
import {modalidadeVinculacaoProcesso as modalidadeVinculacaoProcessoSchema} from './base.schema';

modalidadeVinculacaoProcessoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeVinculacaoProcesso = modalidadeVinculacaoProcessoSchema;
