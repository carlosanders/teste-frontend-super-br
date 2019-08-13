import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {pessoa} from './pessoa.schema';
import {setor} from './setor.schema';
import {tipoDocumento} from './tipo-documento.schema';
import {tarefa} from './tarefa.schema';
import {origemDados} from './origem-dados.schema';
import {componenteDigital} from './componente-digital.schema';
import {vinculacaoDocumento} from './vinculacao-documento.schema';
import {vinculacaoDocumentoPrincipal} from './vinculacao-documento-principal.schema';
import {juntada} from './juntada.schema';

export const documento = new schema.Entity('documento', {
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
    vinculacaoDocumentoPrincipal: vinculacaoDocumentoPrincipal
});
