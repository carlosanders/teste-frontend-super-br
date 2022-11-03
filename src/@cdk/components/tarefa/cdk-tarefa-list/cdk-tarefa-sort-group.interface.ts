import {Tarefa} from '@cdk/models';

export interface CdkTarefaSortOptionsInterface {
    label: string;
    field?: string;
    groupable: boolean;
    groupDataFactory?: (tarefas: Tarefa[], tarefaGroupOption: CdkTarefaSortOptionsInterface, options?: {expanded: boolean | ((groupData: CdkTarefaGroupDataInterface)=>boolean)}) => CdkTarefaGroupDataInterface[];
}

export interface CdkTarefaGroupDataInterface {
    identifier: string | number;
    dataLabel?: string;
    tarefaList: Tarefa[];
    mode: 'group' | 'list';
    expanded: boolean;
    tarefaSortOption?: CdkTarefaSortOptionsInterface
}
