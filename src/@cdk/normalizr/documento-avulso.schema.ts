import {schema} from '@cdk/normalizr-src';
import {setor} from './setor.schema';
import {especieDocumentoAvulso} from './especie-documento-avulso.schema';
import {modelo} from './modelo.schema';
import {pessoa} from './pessoa.schema';
import {documento} from './documento.schema';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {tarefa} from './tarefa.schema';

export const documentoAvulso = new schema.Entity('documentoAvulso', {
    setorOrigem: setor,
    especieDocumentoAvulso: especieDocumentoAvulso,
    modelo: modelo,
    pessoaDestino: pessoa,
    setorDestino: setor,
    documentoResposta: documento,
    documentoRemessa: documento,
    usuarioResponsavel: usuario,
    setorResponsavel: setor,
    usuarioResposta: usuario,
    usuarioRemessa: usuario,
    processo: processo,
    processoDestino: processo,
    tarefaOrigem: tarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
