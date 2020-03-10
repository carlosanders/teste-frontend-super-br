import {processo} from './index.schema';
import {modalidadeVinculacaoProcesso} from './index.schema';
import {usuario} from './index.schema';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from './index.schema';

vinculacaoProcessoSchema.define({
    processoVinculado: processo,
    modalidadeVinculacaoProcesso: modalidadeVinculacaoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoProcesso = vinculacaoProcessoSchema;
