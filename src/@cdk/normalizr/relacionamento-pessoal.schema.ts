import {usuario} from './index.schema';
import {pessoa} from './index.schema';
import {modalidadeRelacionamentoPessoal} from './index.schema';
import {origemDados} from './index.schema';
import {relacionamentoPessoal as relacionamentoPessoalSchema} from './index.schema';

relacionamentoPessoalSchema.define({
    pessoaRelacionada: pessoa,
    modalidadeRelacionamentoPessoal: modalidadeRelacionamentoPessoal,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const relacionamentoPessoal = relacionamentoPessoalSchema;
