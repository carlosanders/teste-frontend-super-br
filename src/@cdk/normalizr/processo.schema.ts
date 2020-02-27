import {classificacao} from './classificacao.schema';
import {origemDados} from './origem-dados.schema';
import {processoOrigem} from './processo-origem.schema';
import {documentoAvulso} from './documento-avulso.schema';
import {pessoa} from './pessoa.schema';
import {localizador} from './localizador.schema';
import {setor} from './setor.schema';
import {modalidadeFase} from './modalidade-fase.schema';
import {especieProcesso} from './especie-processo.schema';
import {usuario} from './usuario.schema';
import {modalidadeMeio} from './modalidade-meio.schema';
import {vinculacaoEtiqueta} from './vinculacao-etiqueta.schema';
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


