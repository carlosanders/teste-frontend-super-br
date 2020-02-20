import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {pessoa} from './pessoa.schema';
import {setor} from './setor.schema';
import {tipoDocumento} from './tipo-documento.schema';
import {tarefa} from './tarefa.schema';
import {origemDados} from './origem-dados.schema';
import {componenteDigital} from './componente-digital.schema';
import {vinculacaoDocumento} from './vinculacao-documento.schema';
import {juntada} from './juntada.schema';
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
