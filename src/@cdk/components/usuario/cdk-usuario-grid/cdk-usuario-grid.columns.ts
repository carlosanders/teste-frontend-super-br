import {TableColumn} from '../../table-definitions/table-column';
import {TableColumnDefinitions} from '../../table-definitions/table-column-definitions';
import {Usuario} from '../../../models';
import {CdkUsuarioGridComponent} from './cdk-usuario-grid.component';
import {TableDefinitions} from '../../table-definitions/table-definitions';
import {TitleCasePipe} from '../../../pipes/title-case.pipe';

export const CdkUsuarioGridColumns: TableDefinitions = {
    identifier: 'CdkUsuarioGridComponent',
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
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => usuario.id,
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'nome',
            headerLabel: 'Nome',
            dataLabel: 'Nome: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => TitleCasePipe.format(usuario.nome),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'email',
            headerLabel: 'Email',
            dataLabel: 'Email: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => usuario.email,
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'colaborador.cargo.nome',
            headerLabel: 'Cargo',
            dataLabel: 'Cargo: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => TitleCasePipe.format(usuario?.colaborador?.cargo?.nome),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'colaborador.modalidadeColaborador.valor',
            headerLabel: 'Modalidade Colaborador',
            dataLabel: 'Modalidade Colaborador: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => TitleCasePipe.format(usuario?.colaborador?.modalidadeColaborador.valor),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 60,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'enabled',
            headerLabel: 'Habilitado',
            dataLabel: 'Habilitado: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return `<input type='checkbox' disabled='true' ${usuario.enabled ? 'checked' : ''} class='mat-checkbox'>`;
            },
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 70,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'nivelAcesso',
            headerLabel: 'Nível de Acesso',
            dataLabel: 'Nível de Acesso: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => usuario.nivelAcesso,
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'username',
            headerLabel: 'Username',
            dataLabel: 'Username: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => usuario.username,
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'criadoPor.nome',
            headerLabel: 'Criado Por',
            dataLabel: 'Criado Por: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => TitleCasePipe.format(usuario?.criadoPor?.nome),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'criadoEm',
            headerLabel: 'Criado Em',
            dataLabel: 'Criado Em: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => usuario.criadoEm?.format("DD/MM/YYYY"),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
        <TableColumn>{
            id: 'atualizadoPor.nome',
            headerLabel: 'Atualizado Por',
            dataLabel: 'Atualizado Por: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => TitleCasePipe.format(usuario?.atualizadoPor?.nome),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {
                    'deleted': scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false),
                    'error': scope.getProp(scope.deletingErrors, usuario.id)
                };
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
            id: 'atualizadoEm',
            headerLabel: 'Atualizado Em',
            dataLabel: 'Atualizado Em: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => usuario.atualizadoEm?.format("DD/MM/YYYY"),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
            id: 'apagadoPor.nome',
            headerLabel: 'Apagado Por',
            dataLabel: 'Apagado Por: ',
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => TitleCasePipe.format(usuario?.apagadoPor?.nome),
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 140,
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
            dataValue: (usuario: Usuario, scope: CdkUsuarioGridComponent) => usuario.apagadoEm,
            dataClass: (usuario: Usuario, scope: CdkUsuarioGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(usuario.id) > -1 || (usuario?.isDisponivel === false), 'error': scope.getProp(scope.deletingErrors, usuario.id)};
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
