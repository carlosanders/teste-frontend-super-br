import {schema} from '@cdk/normalizr-src';
import {classificacao} from './classificacao.schema';
import {origemDados} from './origem-dados.schema';
import {documentoAvulso} from './documento-avulso.schema';
import {pessoa} from './pessoa.schema';
import {localizador} from './localizador.schema';
import {setor} from './setor.schema';
import {modalidadeFase} from './modalidade-fase.schema';
import {especieProcesso} from './especie-processo.schema';
import {usuario} from './usuario.schema';
import {modalidadeMeio} from './modalidade-meio.schema';
import {vinculacaoEtiqueta} from './vinculacao-etiqueta.schema';

export const processo = new schema.Entity('processo', {
    classificacao: classificacao,
    origemDados: origemDados,
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


