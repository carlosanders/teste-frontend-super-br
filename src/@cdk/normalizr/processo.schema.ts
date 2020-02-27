import {classificacao} from './base.schema';
import {origemDados} from './base.schema';
import {processo as processoOrigem} from './base.schema';
import {documentoAvulso} from './base.schema';
import {pessoa} from './base.schema';
import {localizador} from './base.schema';
import {setor} from './base.schema';
import {modalidadeFase} from './base.schema';
import {especieProcesso} from './base.schema';
import {usuario} from './base.schema';
import {modalidadeMeio} from './base.schema';
import {vinculacaoEtiqueta} from './base.schema';
import {processo as processoSchema} from './base.schema';

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
    vinculacoesEtiquetas: [vinculacaoEtiqueta]
});

export const processo = processoSchema;


