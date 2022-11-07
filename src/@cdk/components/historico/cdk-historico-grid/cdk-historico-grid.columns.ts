import {TableColumn} from '../../table-definitions/table-column';
import {TableColumnDefinitions} from '../../table-definitions/table-column-definitions';
import {Historico} from '../../../models';
import {TableDefinitions} from "../../table-definitions/table-definitions";
import {TitleCasePipe} from "../../../pipes/title-case.pipe";
import {CdkHistoricoGridComponent} from "./cdk-historico-grid.component";

export const CdkHistoricoGridColumns: TableDefinitions = {
    identifier: 'CdkHistoricoGridComponent',
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
            dataValue: (historico: Historico, scope: CdkHistoricoGridComponent) => historico.id,
            dataClass: (historico: Historico, scope: CdkHistoricoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(historico.id) > -1 || historico?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, historico.id)};
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
            id: 'descricao',
            headerLabel: 'Descrição',
            dataLabel: 'Descrição: ',
            dataValue: (historico: Historico, scope: CdkHistoricoGridComponent) => TitleCasePipe.format(historico?.descricao),
            dataClass: (historico: Historico, scope: CdkHistoricoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(historico.id) > -1 || historico?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, historico.id)};
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
            id: 'processo.NUP',
            headerLabel: 'NUP',
            dataLabel: 'NUP: ',
            dataValue: (historico: Historico, scope: CdkHistoricoGridComponent) => historico?.processo?.NUP,
            dataClass: (historico: Historico, scope: CdkHistoricoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(historico.id) > -1 || historico?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, historico.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 30,
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
            dataValue: (historico: Historico, scope: CdkHistoricoGridComponent) => TitleCasePipe.format(historico?.criadoPor?.nome),
            dataClass: (historico: Historico, scope: CdkHistoricoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(historico.id) > -1 || historico?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, historico.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 40,
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
            dataValue: (historico: Historico, scope: CdkHistoricoGridComponent) => historico?.criadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (historico: Historico, scope: CdkHistoricoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(historico.id) > -1 || historico?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, historico.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 50,
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
                selected: true,
                order: 1000,
                slave: true,
                width: 0,
                resizable: false,
                ordable: false,
            }
        }
    ]
};
