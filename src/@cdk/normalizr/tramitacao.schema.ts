import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {setor} from './setor.schema';
import {pessoa} from './pessoa.schema';
import {tramitacao as tramitacaoSchema} from './base.schema';

tramitacaoSchema.define({
    setorOrigem: setor,
    setorDestino: setor,
    pessoaDestino: pessoa,
    usuarioRecebimento: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const tramitacao = tramitacaoSchema;
