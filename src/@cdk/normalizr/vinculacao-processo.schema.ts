import {processo} from './processo.schema';
import {modalidadeVinculacaoProcesso} from './modalidade-vinculacao-processo.schema';
import {usuario} from './usuario.schema';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from './base.schema';

vinculacaoProcessoSchema.define({
    processoVinculado: processo,
    modalidadeVinculacaoProcesso: modalidadeVinculacaoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoProcesso = vinculacaoProcessoSchema;
