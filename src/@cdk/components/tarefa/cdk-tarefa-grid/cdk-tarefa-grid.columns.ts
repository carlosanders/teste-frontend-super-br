import {TableColumn} from '../../table-definitions/table-column';
import {TableColumnDefinitions} from '../../table-definitions/table-column-definitions';
import {Tarefa} from '../../../models';
import {TableDefinitions} from '../../table-definitions/table-definitions';
import {TitleCasePipe} from '../../../pipes/title-case.pipe';
import {CdkTarefaGridComponent} from './cdk-tarefa-grid.component';
import {CdkUsuarioGridComponent} from '../../usuario/cdk-usuario-grid/cdk-usuario-grid.component';
import {CdkTarefaListComponent} from '../cdk-tarefa-list/cdk-tarefa-list.component';

export const CdkTarefaGridColumns: TableDefinitions = {
    identifier: 'CdkTarefaGridComponent',
    version: '1',
    columns: [
        <TableColumn> {
            id: 'select',
            headerLabel: '',
            dataLabel: '',
            positionFixed: true,
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 0,
                slave: true,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'id',
            headerLabel: 'Id',
            dataLabel: 'Id: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa.id,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 10,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'processo.NUP',
            headerLabel: 'Processo',
            dataLabel: 'Processo: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => TitleCasePipe.format(tarefa?.processo?.NUP),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 20,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'urgente',
            headerLabel: 'Urgente',
            dataLabel: 'Urgente: ',
            dataValue: (tarefa: Tarefa, scope: CdkUsuarioGridComponent) => {
                return `<input type='checkbox' disabled='true' ${tarefa.urgente ? 'checked' : ''} class='mat-checkbox'>`;
            },
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 30,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'observacao',
            headerLabel: 'Observação',
            dataLabel: 'Observacao: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => TitleCasePipe.format(tarefa?.observacao),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 40,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'redistribuida',
            headerLabel: 'Redistribuída',
            dataLabel: 'Redistribuida: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => TitleCasePipe.format(tarefa?.redistribuida ? "sim" : "não"),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 50,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraLeitura',
            headerLabel: 'Data da Leitura',
            dataLabel: 'Data da Leitura: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.dataHoraLeitura?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 60,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraDistribuicao',
            headerLabel: 'Data da Distribuição',
            dataLabel: 'Data da Distribuicao: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.dataHoraDistribuicao?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 70,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraInicioPrazo',
            headerLabel: 'Data do Início do Prazo',
            dataLabel: 'Data do Inicio do Prazo: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.dataHoraInicioPrazo?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 80,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraFinalPrazo',
            headerLabel: 'Data do Final do Prazo',
            dataLabel: 'Data do final do Prazo: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.dataHoraFinalPrazo?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 90,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraConclusaoPrazo',
            headerLabel: 'Data da Conclusão do Prazo',
            dataLabel: 'Data da Conclusao do Prazo: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.dataHoraConclusaoPrazo?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 100,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'especieTarefa.nome',
            headerLabel: 'Espécie de Tarefa',
            dataLabel: 'Espécie de Tarefa: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => TitleCasePipe.format(tarefa.especieTarefa.nome),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 110,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'usuarioResponsavel.nome',
            headerLabel: 'Usuário Responsável',
            dataLabel: 'Usuario Responsavel: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.usuarioResponsavel?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 120,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'setorOrigem.nome',
            headerLabel: 'Setor de Origem',
            dataLabel: 'Setor de Origem: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.setorOrigem?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 130,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'setorResponsavel.nome',
            headerLabel: 'Setor Responsável',
            dataLabel: 'Setor Responsável: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => `${TitleCasePipe.format(tarefa.setorResponsavel?.nome)} (${tarefa.setorResponsavel?.unidade?.sigla})`,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 150,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'usuarioConclusaoPrazo.nome',
            headerLabel: 'Usuário da Conclusão do Prazo',
            dataLabel: 'Usuario da Conclusao do Prazo: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.usuarioConclusaoPrazo?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 160,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'criadoPor.nome',
            headerLabel: 'Criado por',
            dataLabel: 'Criado por: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.criadoPor?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 170,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'criadoEm',
            headerLabel: 'Criado Em',
            dataLabel: 'Criado Em: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.criadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 180,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'atualizadoPor.nome',
            headerLabel: 'Atualizado Por',
            dataLabel: 'Atualizado Por: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.atualizadoPor?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 190,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'atualizadoEm',
            headerLabel: 'Atualizado Em',
            dataLabel: 'Atualizado Em: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.atualizadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 200,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'apagadoPor.nome',
            headerLabel: 'Apagado Por',
            dataLabel: 'Apagado Por: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.apagadoPor?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 210,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'apagadoEm',
            headerLabel: 'Apagado Em',
            dataLabel: 'Apagado Em: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => tarefa?.apagadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tarefa.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 220,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'actions',
            headerLabel: '',
            dataLabel: '',
            positionFixed: true,
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: false,
                order: 1000,
                slave: true,
                width: 0,
                resizable: false,
                ordable: false,
            }
        }
    ]
};
