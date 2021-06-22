import {DadosBasicosEffect} from './dados-basicos.effects';
import {AssuntosEffect} from './assunto.effects';
import {InteressadosEffect} from './interessado.effects';
import {VinculacaoProcessoEffects} from './vinculacao-processo.effects';
import {TarefaEffect} from './tarefa.effects';
import {ConfiguracaoNupEffects} from './configuracao-nup.effects';
import {JuntadaEffects} from './juntada.effects';

export const effects = [
    DadosBasicosEffect,
    AssuntosEffect,
    InteressadosEffect,
    VinculacaoProcessoEffects,
    TarefaEffect,
    ConfiguracaoNupEffects,
    JuntadaEffects
];

export * from './dados-basicos.effects';
export * from './assunto.effects';
export * from './interessado.effects';
export * from './vinculacao-processo.effects';
export * from './tarefa.effects';
export * from './configuracao-nup.effects';
export * from './juntada.effects';


