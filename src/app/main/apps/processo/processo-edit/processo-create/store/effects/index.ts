import {DadosBasicosEffect} from './dados-basicos.effects';
import {AssuntosEffect} from './assunto.effects';
import {InteressadosEffect} from './interessado.effects';
import {VinculacaoProcessoEffects} from './vinculacao-processo.effects';
import {TarefaEffect} from './tarefa.effects';
import {ConfiguracaoNupEffects} from "./configuracao-nup.effects";

export const effects = [
    DadosBasicosEffect,
    AssuntosEffect,
    InteressadosEffect,
    VinculacaoProcessoEffects,
    TarefaEffect,
    ConfiguracaoNupEffects
];

export * from './dados-basicos.effects';
export * from './assunto.effects';
export * from './interessado.effects';
export * from './vinculacao-processo.effects';
export * from './tarefa.effects';
export * from './configuracao-nup.effects';


