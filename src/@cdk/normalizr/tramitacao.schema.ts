import {usuario} from './base.schema';
import {processo} from './base.schema';
import {setor} from './base.schema';
import {pessoa} from './base.schema';
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
