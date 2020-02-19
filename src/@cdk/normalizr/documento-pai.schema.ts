import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {pessoa} from './pessoa.schema';
import {setor} from './setor.schema';
import {tipoDocumento} from './tipo-documento.schema';
import {tarefa} from './tarefa.schema';
import {origemDados} from './origem-dados.schema';
import {componenteDigital} from './componente-digital.schema';
import {documentoPai as documentoPaiSchema} from './base.schema';

documentoPaiSchema.define({
    processoOrigem: processo,
    procedencia: pessoa,
    tipoDocumento: tipoDocumento,
    setorOrigem: setor,
    tarefaOrigem: tarefa,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    componentesDigitais: [componenteDigital]
});

export const documentoPai = documentoPaiSchema;
