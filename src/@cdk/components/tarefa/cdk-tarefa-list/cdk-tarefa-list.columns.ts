import {TableColumn} from '../../table-definitions/table-column';
import {TableColumnDefinitions} from '@cdk/components/table-definitions/table-column-definitions';
import {TableDefinitions} from '@cdk/components/table-definitions/table-definitions';
import {Tarefa} from '@cdk/models';
import {CdkTarefaListComponent} from './cdk-tarefa-list.component';
import {TitleCasePipe} from '@cdk/pipes/title-case.pipe';
import {FormatNupPipe} from '@cdk/pipes/format-nup.pipe';

export const CdkTarefaListColumns: TableDefinitions = {
    identifier: 'CdkTarefaListComponent',
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
                selected: false,
                order: 0,
                slave: true,
                width: 0,
                resizable: false,
                ordable: false,
                sortable: false
            }
        },
        <TableColumn> {
            id: 'id',
            headerLabel: 'Id',
            dataLabel: 'Id: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => tarefa.id,
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: false,
                order: 10,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: true
            }
        },
        <TableColumn> {
            id: 'processo.NUP',
            headerLabel: 'NUP',
            dataLabel: 'NUP: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {
                let icons = '';

                if (tarefa.processo?.acessoNegado) {
                    icons += `<span class='red-fg s-16 mat-icon material-icons' title='Acesso negado!'>block</span>`;
                }
                if (tarefa.processo?.acessoRestrito) {
                    icons += `<span class='red-fg s-16 mat-icon material-icons' title='Acesso restrito!'>lock</span>`;
                }
                if (tarefa.processo?.documentoAvulsoOrigem) {
                    icons += `<span class='s-16 mat-icon material-icons' title='Com documento avulso'>mail</span>`;
                }

                return `
                    ${FormatNupPipe.format(tarefa.processo?.NUP)}
                    <div class='nup-icons'>
                        ${icons}
                    </div>
                `;
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: false,
                order: 20,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: true
            }
        },
        <TableColumn> {
            id: 'processo.modalidadeMeio.valor',
            headerLabel: 'Modalidade / Espécie',
            dataLabel: 'Modalidade / Espécie: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => `${TitleCasePipe.format(tarefa.processo?.modalidadeMeio?.valor)} ${TitleCasePipe.format(tarefa.processo?.especieProcesso?.nome) } ${ tarefa.vinculacaoWorkflow ? ' (Workflow)' : '' }`,
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: false,
                order: 30,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: false
            }
        },
        <TableColumn> {
            id: 'especieTarefa.nome',
            headerLabel: 'Espécie Tarefa',
            dataLabel: 'Espécie Tarefa: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => `${TitleCasePipe.format(tarefa.especieTarefa?.nome)} ${tarefa.vinculacaoWorkflow ? ' (Tarefa de Workflow)' : ''}`,
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 40,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: true
            }
        },
        <TableColumn> {
            id: 'setorResponsavel.nome',
            headerLabel: 'Setor Responsável',
            dataLabel: 'Setor Responsável: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => `${TitleCasePipe.format(tarefa.setorResponsavel?.nome)} (${tarefa.setorResponsavel?.unidade?.sigla})`,
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 50,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: false
            }
        },
        <TableColumn> {
            id: 'dataHoraDistribuicao',
            headerLabel: 'Data Distribuição',
            dataLabel: 'Data Distribuição: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => `${tarefa.dataHoraDistribuicao?.format('DD/MM/YYYY') ?? ''}`,
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 60,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: true
            }
        },
        <TableColumn> {
            id: 'dataHoraFinalPrazo',
            headerLabel: 'Prazo',
            dataLabel: 'Prazo: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {

                let template = `Prazo de ${tarefa.dataHoraInicioPrazo?.format('DD/MM/YYYY HH:mm:ss')} até `;

                if (tarefa.dataHoraFinalPrazo) {
                    template += `
                        <span class='${scope.prazoVenceHoje(tarefa) || scope.prazoVenceu(tarefa) ? 'prazo-vence-hoje' : ''} ${scope.prazoVenceu(tarefa) ? 'prazo-venceu' : ''}'>
                            ${tarefa.dataHoraFinalPrazo?.format('DD/MM/YYYY HH:mm:ss')}
                        </span>
                    `;
                } else {
                    template += `
                        <span class='secondary-text mat-icon material-icons' title='Prazo fechado'>
                            lock
                        </span>
                    `;

                }

                return template;
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 70,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: true
            }
        },
        <TableColumn> {
            id: 'observacao',
            headerLabel: 'Observação',
            dataLabel: 'Observação: ',
            positionFixed: true,
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 80,
                slave: true,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: false
            }
        },
        <TableColumn> {
            id: 'vinculacoesEtiquetas',
            headerLabel: 'Etiquetas',
            dataLabel: 'Etiquetas: ',
            positionFixed: false,
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: false,
                order: 90,
                slave: true,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: false
            }
        },
        <TableColumn> {
            id: 'vinculacoesEtiquetas.objectClass',
            headerLabel: 'Minutas',
            dataLabel: 'Minutas: ',
            positionFixed: false,
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: false,
                order: 100,
                slave: true,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: true
            }
        },
        <TableColumn> {
            id: 'usuarioResponsavel.nome',
            headerLabel: 'Usuário Responsável',
            dataLabel: 'Usuário Responsável: ',
            positionFixed: false,
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => TitleCasePipe.format(tarefa.usuarioResponsavel?.nome),
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 110,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
                sortable: false
            }
        },
        <TableColumn> {
            id: 'urgente',
            headerLabel: 'Urgência',
            dataLabel: 'Urgência: ',
            positionFixed: false,
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 120,
                slave: true,
                width: 0,
                resizable: false,
                ordable: true,
                sortable: true
            }
        },
        <TableColumn> {
            id: 'criadoPor.nome',
            headerLabel: 'Criado por',
            dataLabel: 'Criado por: ',
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => tarefa?.criadoPor?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 280,
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
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => tarefa?.criadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 290,
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
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => tarefa?.atualizadoPor?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 300,
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
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => tarefa?.atualizadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 310,
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
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => tarefa?.apagadoPor?.nome,
            dataClass: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 320,
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
            dataValue: (tarefa: Tarefa, scope: CdkTarefaListComponent) => tarefa?.apagadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (tarefa: Tarefa, scope: CdkTarefaListComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tarefa.id) > -1 || tarefa?.apagadoEm};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 330,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
    ]
};
