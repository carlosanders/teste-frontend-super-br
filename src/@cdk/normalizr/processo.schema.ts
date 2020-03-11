import {classificacao, lembrete} from './index.schema';
import {origemDados} from './index.schema';
import {processo as processoOrigem} from './index.schema';
import {documentoAvulso} from './index.schema';
import {pessoa} from './index.schema';
import {localizador} from './index.schema';
import {setor} from './index.schema';
import {modalidadeFase} from './index.schema';
import {especieProcesso} from './index.schema';
import {usuario} from './index.schema';
import {modalidadeMeio} from './index.schema';
import {vinculacaoEtiqueta} from './index.schema';
import {processo as processoSchema} from './index.schema';

processoSchema.define({
    classificacao: classificacao,
    origemDados: origemDados,
    processoOrigem: processoOrigem,
    documentoAvulsoOrigem: documentoAvulso,
    procedencia: pessoa,
    localizador: localizador,
    setorAtual: setor,
    setorInicial: setor,
    modalidadeFase: modalidadeFase,
    modalidadeMeio: modalidadeMeio,
    especieProcesso: especieProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    lembretes: [lembrete],
    vinculacoesEtiquetas: [vinculacaoEtiqueta]
});

export const processo = processoSchema;


