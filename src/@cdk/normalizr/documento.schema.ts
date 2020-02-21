import {usuario} from './base.schema';
import {processo} from './base.schema';
import {pessoa} from './base.schema';
import {setor} from './base.schema';
import {tipoDocumento} from './base.schema';
import {tarefa} from './base.schema';
import {origemDados} from './base.schema';
import {componenteDigital} from './base.schema';
import {vinculacaoDocumento} from './base.schema';
import {juntada} from './base.schema';
import {documento as documentoSchema} from './base.schema';

documentoSchema.define({
    processoOrigem: processo,
    procedencia: pessoa,
    tipoDocumento: tipoDocumento,
    setorOrigem: setor,
    tarefaOrigem: tarefa,
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
