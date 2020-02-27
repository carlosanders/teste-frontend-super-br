import {usuario} from './index.schema';
import {modalidadeVinculacaoProcesso as modalidadeVinculacaoProcessoSchema} from './index.schema';

modalidadeVinculacaoProcessoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeVinculacaoProcesso = modalidadeVinculacaoProcessoSchema;
