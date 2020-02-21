import {usuario} from './base.schema';
import {pessoa} from './base.schema';
import {modalidadeRelacionamentoPessoal} from './base.schema';
import {origemDados} from './base.schema';
import {relacionamentoPessoal as relacionamentoPessoalSchema} from './base.schema';

relacionamentoPessoalSchema.define({
    pessoaRelacionada: pessoa,
    modalidadeRelacionamentoPessoal: modalidadeRelacionamentoPessoal,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const relacionamentoPessoal = relacionamentoPessoalSchema;
