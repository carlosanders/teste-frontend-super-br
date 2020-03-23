import {documentoAvulso, usuario} from './index.schema';
import {processo} from './index.schema';
import {pessoa} from './index.schema';
import {setor} from './index.schema';
import {tipoDocumento} from './index.schema';
import {tarefa} from './index.schema';
import {origemDados} from './index.schema';
import {componenteDigital} from './index.schema';
import {vinculacaoDocumento} from './index.schema';
import {juntada} from './index.schema';
import {documento as documentoSchema} from './index.schema';

documentoSchema.define({
    processoOrigem: processo,
    procedencia: pessoa,
    tipoDocumento: tipoDocumento,
    setorOrigem: setor,
    tarefaOrigem: tarefa,
    documentoAvulsoOrigem: documentoAvulso,
    origemDados: origemDados,
    criadoPor: usuario,
    juntadaAtual: juntada,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    componentesDigitais: [componenteDigital],
    vinculacoesDocumentos: [vinculacaoDocumento],
    vinculacaoDocumento: vinculacaoDocumento
});

export const documento = documentoSchema;
