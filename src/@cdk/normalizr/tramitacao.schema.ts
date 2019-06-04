import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {setor} from './setor.schema';
import {pessoa} from './pessoa.schema';

export const tramitacao = new schema.Entity('tramitacao', {
    processo: processo,
    setorOrigem: setor,
    setorDestino: setor,
    pessoaDestino: pessoa,
    usuarioRecebimento: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
