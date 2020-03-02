import {usuario} from './index.schema';
import {modalidadeRelacionamentoPessoal as modalidadeRelacionamentoPessoalSchema} from './index.schema';

modalidadeRelacionamentoPessoalSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeRelacionamentoPessoal = modalidadeRelacionamentoPessoalSchema;
