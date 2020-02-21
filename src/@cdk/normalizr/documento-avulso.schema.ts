import {setor} from './base.schema';
import {especieDocumentoAvulso} from './base.schema';
import {modelo} from './base.schema';
import {pessoa} from './base.schema';
import {documento} from './base.schema';
import {usuario} from './base.schema';
import {processo} from './base.schema';
import {tarefa} from './base.schema';
import {documentoAvulso as documentoAvulsoSchema} from './base.schema';

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
