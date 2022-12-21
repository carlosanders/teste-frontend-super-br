import {TableColumn} from '../../table-definitions/table-column';
import {TableColumnDefinitions} from '../../table-definitions/table-column-definitions';
import {DocumentoAvulso} from '../../../models';
import {TableDefinitions} from '../../table-definitions/table-definitions';
import {TitleCasePipe} from '../../../pipes/title-case.pipe';
import {CdkUsuarioGridComponent} from '../../usuario/cdk-usuario-grid/cdk-usuario-grid.component';
import {CdkDocumentoAvulsoGridComponent} from './cdk-documento-avulso-grid.component';

export const CdkDocumentoAvulsoGridColumns: TableDefinitions = {
    identifier: 'CdkDocumentoAvulsoGridComponent',
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
                width: 10,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'id',
            headerLabel: 'Id',
            dataLabel: 'Id: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso.id,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 10,
                slave: false,
                width: 10,
                resizable: true,
                ordable: true,
            }
        },
        <TableColumn> {
            id: 'especieDocumentoAvulso.nome',
            headerLabel: 'Espécie de Documento Avulso',
            dataLabel: 'Espécie de Documento Avulso: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => TitleCasePipe.format(documentoAvulso?.especieDocumentoAvulso?.nome),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => `${TitleCasePipe.format(documentoAvulso.setorOrigem?.nome)} (${documentoAvulso.setorOrigem?.unidade?.sigla})`,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => TitleCasePipe.format(documentoAvulso?.observacao),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            id: 'urgente',
            headerLabel: 'Urgente',
            dataLabel: 'Urgente: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkUsuarioGridComponent) => {
                return `<input type='checkbox' disabled='true' ${documentoAvulso.urgente ? 'checked' : ''} class='mat-checkbox'>`;
            },
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            id: 'modelo.nome',
            headerLabel: 'Modelo',
            dataLabel: 'Modelo: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => TitleCasePipe.format(documentoAvulso?.modelo?.nome),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            id: 'mecanismoRemessa',
            headerLabel: 'Mecanismo Remessa',
            dataLabel: 'Mecanismo Remessa: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => TitleCasePipe.format(documentoAvulso?.mecanismoRemessa),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            id: 'documentoResposta',
            headerLabel: 'Documento de Resposta',
            dataLabel: 'Documento de Resposta: ',
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 110,
                slave: true,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'documentoRemessa',
            headerLabel: 'Documento de Remessa',
            dataLabel: 'Documento de Remessa: ',
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 120,
                slave: true,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraEncerramento',
            headerLabel: 'Data Encerramento',
            dataLabel: 'Data Encerramento: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.dataHoraEncerramento?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 130,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraInicioPrazo',
            headerLabel: 'Data do Início Prazo',
            dataLabel: 'Data do Início Prazo: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.dataHoraInicioPrazo?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 140,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraFinalPrazo',
            headerLabel: 'Data do Final do Prazo',
            dataLabel: 'Data do Final do Prazo: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.dataHoraFinalPrazo?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 150,
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.dataHoraConclusaoPrazo?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 160,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraRemessa',
            headerLabel: 'Data Remessa',
            dataLabel: 'Data Remessa: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.dataHoraRemessa?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 170,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraResposta',
            headerLabel: 'Data Resposta',
            dataLabel: 'Data Resposta: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.dataHoraRemessa?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 180,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'dataHoraReiteracao',
            headerLabel: 'Data Reiteração',
            dataLabel: 'Data Reiteração: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.dataHoraReiteracao?.format("DD/MM/YYYY HH:mm:ss"),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 190,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'pessoaDestino.nome',
            headerLabel: 'Pessoa de Destino',
            dataLabel: 'Pessoa de Destino: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => TitleCasePipe.format(documentoAvulso?.pessoaDestino?.nome),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 200,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'setorDestino.nome',
            headerLabel: 'Setor de Destino',
            dataLabel: 'Setor de Destino: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => TitleCasePipe.format(documentoAvulso?.setorDestino?.nome),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: true,
                excluded: false,
                selected: true,
                order: 210,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'processo',
            headerLabel: 'NUP',
            dataLabel: 'NUP: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => TitleCasePipe.format(documentoAvulso?.processo?.NUP),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: true,
                order: 220,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'documentoAvulsoOrigem.especieDocumentoAvulso.nome',
            headerLabel: 'Documento Avulso de Origem',
            dataLabel: 'Documento Avulso de Origem: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.documentoAvulsoOrigem?.especieDocumentoAvulso?.nome,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 230,
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.usuarioResponsavel?.nome,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 250,
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => `${TitleCasePipe.format(documentoAvulso.setorResponsavel?.nome)} (${documentoAvulso.setorResponsavel?.unidade?.sigla})`,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 250,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'usuarioResposta.nome',
            headerLabel: 'Usuário Resposta',
            dataLabel: 'Usuario Resposta: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.usuarioResposta?.nome,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 260,
                slave: false,
                width: 0,
                resizable: false,
                ordable: false,
            }
        },
        <TableColumn> {
            id: 'usuarioRemessa.nome',
            headerLabel: 'Usuário Remessa',
            dataLabel: 'Usuário Remessa: ',
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.usuarioRemessa?.nome,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
            },
            definitions: <TableColumnDefinitions>{
                fixed: false,
                excluded: false,
                selected: false,
                order: 270,
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.criadoPor?.nome,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.criadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.atualizadoPor?.nome,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.atualizadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.apagadoPor?.nome,
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
            dataValue: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => documentoAvulso?.apagadoEm?.format('DD/MM/YYYY HH:mm:ss'),
            dataClass: (documentoAvulso: DocumentoAvulso, scope: CdkDocumentoAvulsoGridComponent) => {
                return {'deleted':scope.deletedIds?.indexOf(documentoAvulso.id) > -1 || documentoAvulso?.apagadoEm, 'error': scope.getProp(scope.deletingErrors, documentoAvulso.id)};
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
