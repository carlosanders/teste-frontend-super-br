import {processo} from './base.schema';
import {modalidadeVinculacaoProcesso} from './base.schema';
import {usuario} from './base.schema';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from './base.schema';

vinculacaoProcessoSchema.define({
    processoVinculado: processo,
    modalidadeVinculacaoProcesso: modalidadeVinculacaoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoProcesso = vinculacaoProcessoSchema;
