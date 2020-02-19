import {usuario} from './usuario.schema';
import {pessoa} from './pessoa.schema';
import {modalidadeRelacionamentoPessoal} from './modalidade-relacionamento-pessoal.schema';
import {origemDados} from './origem-dados.schema';
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
