import {usuario} from './index.schema';
import {processo} from './index.schema';
import {setor} from './index.schema';
import {pessoa} from './index.schema';
import {tramitacao as tramitacaoSchema} from './index.schema';

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
