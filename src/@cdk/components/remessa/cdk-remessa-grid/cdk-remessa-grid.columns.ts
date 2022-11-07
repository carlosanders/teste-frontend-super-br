import {TableColumn} from '../../table-definitions/table-column';
import {TableColumnDefinitions} from '../../table-definitions/table-column-definitions';
import {TableDefinitions} from "../../table-definitions/table-definitions";
import {TitleCasePipe} from "../../../pipes/title-case.pipe";
import {CdkUsuarioGridComponent} from "../../usuario/cdk-usuario-grid/cdk-usuario-grid.component";
import {CdkRemessaGridComponent} from "./cdk-remessa-grid.component";
import {Tramitacao} from "../../../models";

export const CdkRemessaGridColumns: TableDefinitions = {
    identifier: 'CdkRemessaGridComponent',
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
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => tramitacao.id,
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 10,
                slave: false,
                width: 0,
                resizable: true,
                ordable: true,
            }
        },
        <TableColumn> {
            id: 'nup',
            headerLabel: 'NUP',
            dataLabel: 'NUP: ',
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => tramitacao?.processo?.NUP,
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
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
            id: 'setorOrigem.nome',
            headerLabel: 'Setor de Origem',
            dataLabel: 'Setor de Origem: ',
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => TitleCasePipe.format(tramitacao?.setorOrigem?.nome),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 25,
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
            dataValue: (tramitacao: Tramitacao, scope: CdkUsuarioGridComponent) => {
                return `<input type='checkbox' disabled='true' ${tramitacao.urgente ? 'checked' : ''} class='mat-checkbox'>`;
            },
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
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
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => TitleCasePipe.format(tramitacao?.observacao),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
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
            id: 'dataHoraRecebimento',
            headerLabel: 'Data de Recebimento',
            dataLabel: 'Data de Recebimento: ',
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => tramitacao?.dataHoraRecebimento?.format("DD/MM/YYYY HH:mm"),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
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
            id: 'usuarioRecebimento.nome',
            headerLabel: 'Usuário Recebimento',
            dataLabel: 'Usuário Recebimento: ',
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => TitleCasePipe.format(tramitacao?.usuarioRecebimento?.nome),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
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
            id: 'pessoaDestino.nome',
            headerLabel: 'Pessoa Destino',
            dataLabel: 'Pessoa Destino: ',
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => TitleCasePipe.format(tramitacao?.pessoaDestino?.nome),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
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
            id: 'criadoPor.nome',
            headerLabel: 'Criado por',
            dataLabel: 'Criado por: ',
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => TitleCasePipe.format(tramitacao?.criadoPor?.nome),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 80,
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
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => tramitacao?.criadoEm?.format('DD/MM/YYYY'),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 90,
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
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => TitleCasePipe.format(tramitacao?.atualizadoPor?.nome),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 100,
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
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => tramitacao?.atualizadoEm?.format('DD/MM/YYYY'),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 110,
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
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => TitleCasePipe.format(tramitacao?.apagadoPor?.nome),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
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
            id: 'apagadoEm',
            headerLabel: 'Apagado Em',
            dataLabel: 'Apagado Em: ',
            dataValue: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => tramitacao?.apagadoEm?.format('DD/MM/YYYY'),
            dataClass: (tramitacao: Tramitacao, scope: CdkRemessaGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(tramitacao.id) > -1 || tramitacao?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, tramitacao.id)};
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
