import {setor} from './index.schema';
import {especieDocumentoAvulso} from './index.schema';
import {modelo} from './index.schema';
import {pessoa} from './index.schema';
import {documento} from './index.schema';
import {usuario} from './index.schema';
import {processo} from './index.schema';
import {tarefa} from './index.schema';
import {documentoAvulso as documentoAvulsoSchema} from './index.schema';

documentoAvulsoSchema.define({
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

export const documentoAvulso = documentoAvulsoSchema;
