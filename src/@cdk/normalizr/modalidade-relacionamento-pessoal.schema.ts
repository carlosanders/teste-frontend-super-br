import {usuario} from './base.schema';
import {modalidadeRelacionamentoPessoal as modalidadeRelacionamentoPessoalSchema} from './base.schema';

modalidadeRelacionamentoPessoalSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeRelacionamentoPessoal = modalidadeRelacionamentoPessoalSchema;
