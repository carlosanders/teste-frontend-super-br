import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Assinatura, ComponenteDigital, Documento, Folder, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from 'app/store';
import * as AssinaturaStore from '../../../../store';
import * as fromStoreTarefas from 'app/main/apps/tarefas/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {modulesConfig} from 'modules/modules-config';
import {DynamicService} from 'modules/dynamic.service';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {CdkUtils} from '@cdk/utils';
import {
    CdkAssinaturaEletronicaPluginComponent
} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'tarefas-operacoes-bloco',
    templateUrl: './tarefas-operacoes-bloco.component.html',
    styleUrls: ['./tarefas-operacoes-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasOperacoesBlocoComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    folders$: Observable<Folder[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[];

    routeAtividadeBloco = 'atividade-bloco';

    routerState: any;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    snackSubscriptionType: string;

    private _profile: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _dynamicService
     * @param _store
     * @param _loginService
     * @param _snackBar
     * @param _router
     * @param _changeDetectorRef
     * @param _matDialog
     */
    constructor(
        private _dynamicService: DynamicService,
        private _store: Store<fromStore.State>,
        public _loginService: LoginService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
        this.tarefas$ = this._store.pipe(select(fromStoreTarefas.getSelectedTarefas));
        this.folders$ = this._store.pipe(select(fromStoreTarefas.getFolders));
        this.selectedIds$ = this._store.pipe(select(fromStoreTarefas.getSelectedTarefaIds));
        this._profile = _loginService.getUserProfile().colaborador;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription && this.routerState?.url.indexOf('operacoes-bloco') === -1) {
                this.sheetRef.dismiss();
            }

            this.routerState = routerState.state;
        });

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
            if (tarefas.length === 0) {
                this._router.navigate([
                    'apps',
                    'tarefas',
                    this.routerState.params.generoHandle,
                    this.routerState.params.typeHandle,
                    this.routerState.params.targetHandle
                ]).then();
            }
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selected => this.selectedIds = selected);
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas/operacoes-bloco/tarefas-operacoes-bloco';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });

        const path2 = 'app/main/apps/tarefas';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(path2) &&
                module.routerLinks[path2].hasOwnProperty('atividade-bloco') &&
                module.routerLinks[path2]['atividade-bloco'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividadeBloco = module.routerLinks[path2]['atividade-bloco'][this.routerState.params.generoHandle];
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doDeleteTarefa(tarefaId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        const tarefa = new Tarefa();
        tarefa.id = tarefaId;
        this._store.dispatch(new fromStoreTarefas.DeleteTarefa({
            tarefaId: tarefa.id,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStoreTarefas.DeleteTarefa({
                    tarefaId: tarefa.id,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStoreTarefas.DeleteTarefaFlush()
            ],
            undo: new fromStoreTarefas.UndeleteTarefa({
                tarefa: tarefa,
                operacaoId: operacaoId,
                redo: null,
                undo: null
            })
        }));

        if (this.snackSubscription) {
            if (this.snackSubscriptionType === 'delete') {
                // temos um snack aberto, temos que ignorar
                this.snackSubscription.unsubscribe();
                this.sheetRef.dismiss();
                this.snackSubscriptionType = null;
                this.snackSubscription = null;
            } else {
                // Temos um snack de outro tipo aberto, temos que confirmá-lo
                this.sheetRef.dismiss();
            }
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletado(s)'
            }
        });

        this.snackSubscriptionType = 'delete';
        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStoreTarefas.DeleteTarefaCancel());
            } else {
                this._store.dispatch(new fromStoreTarefas.DeleteTarefaFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscriptionType = null;
            this.snackSubscription = null;
        });
    }

    doCienciaTarefa(tarefaId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        const tarefa = new Tarefa();
        tarefa.id = tarefaId;
        this._store.dispatch(new fromStoreTarefas.DarCienciaTarefa({
            tarefa: tarefa,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStoreTarefas.DarCienciaTarefa({
                    tarefa: tarefa,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStoreTarefas.DarCienciaTarefaFlush()
            ],
            undo: null
        }));

        if (this.snackSubscription) {
            if (this.snackSubscriptionType === 'ciencia') {
                // temos um snack de ciência aberto, temos que ignorar
                this.snackSubscription.unsubscribe();
                this.sheetRef.dismiss();
                this.snackSubscriptionType = null;
                this.snackSubscription = null;
            } else {
                // Temos um snack de outro tipo aberto, temos que confirmá-lo
                this.sheetRef.dismiss();
            }
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'check',
                text: 'Ciência'
            }
        });

        this.snackSubscriptionType = 'ciencia';
        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStoreTarefas.DarCienciaTarefaCancel());
            } else {
                this._store.dispatch(new fromStoreTarefas.DarCienciaTarefaFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscriptionType = null;
            this.snackSubscription = null;
        });
    }

    doRestauraTarefa(tarefaId): void {
        const operacaoId = CdkUtils.makeId();
        const tarefa = new Tarefa();
        tarefa.id = tarefaId;
        this._store.dispatch(new fromStoreTarefas.UndeleteTarefa({
            tarefa: tarefa,
            operacaoId: operacaoId,
            redo: null,
            undo: null
        }));
    }

    doDeleteTarefaBloco(): void {
        const lote = CdkUtils.makeId();
        this.selectedIds.forEach(tarefaId => this.doDeleteTarefa(tarefaId, lote));
    }

    doRestaurarBloco(): void {
        this.selectedIds.forEach(tarefaId => this.doRestauraTarefa(tarefaId));
    }

    doCompartilharBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/'
            + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/compartilhamento-bloco'
        ]).then();
    }

    doRemoveCompartilharBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/'
            + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/remove-compartilhamento-bloco'
        ]).then();
    }

    doEtiquetarBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco'
        ]).then();
    }

    doMovimentarBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/' + this.routeAtividadeBloco
        ]).then();
    }

    doMinutas(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/minutas'
        ]).then();
    }

    doEditTarefaBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa-editar-bloco'
        ]).then();
    }

    doRedistribuiTarefaBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/redistribuicao-edit-bloco'
        ]).then();
    }

    doCienciaBloco(): void {
        const lote = CdkUtils.makeId();
        this.selectedIds.forEach(tarefaId => this.doCienciaTarefa(tarefaId, lote));
    }

    doCreateTarefaBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa-bloco'
        ]).then();
    }

    doUploadBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/upload-bloco'
        ]).then();
    }

    doEditorBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/modelo-bloco/modelo'
        ]).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/documento-avulso-bloco'
        ]).then();
    }

    doRemeterOficiosBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/remeter-oficios-bloco'
        ]).then();
    }

    setFolder(folder): void {
        const loteId = CdkUtils.makeId();
        this.tarefas.forEach((tarefa) => {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStoreTarefas.SetFolderOnSelectedTarefas({
                tarefa: tarefa,
                folder: folder,
                operacaoId: operacaoId,
                loteId: loteId
            }));
        });
    }

    doAssinaturaTarefas(): void {
        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            if (result.certificadoDigital) {
                const ids = this.tarefas.map(tarefa => tarefa.vinculacoesEtiquetas).flat()
                    .filter(vinculacao => !!vinculacao.objectId).map(vinculacao => vinculacao.objectId);
                this._store.dispatch(new AssinaturaStore.AssinaDocumento(ids));
            } else {
                this.tarefas.map(tarefa => tarefa.vinculacoesEtiquetas).flat()
                    .filter(vinculacao => !!vinculacao.objectId).forEach((vinculacao) => {
                    vinculacao.objectContext['componentesDigitaisId']?.forEach((componenteDigitalId) => {
                        const documento = new Documento();
                        documento.id = vinculacao.objectId;
                        const assinatura = new Assinatura();
                        const componenteDigital = new ComponenteDigital();
                        componenteDigital.id = componenteDigitalId;
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            operacaoId: operacaoId
                        }));
                    });
                    vinculacao.objectContext['componentesDigitaisVinculadosId']?.forEach((componenteDigitalId) => {
                        const documento = new Documento();
                        documento.id = vinculacao.objectId;
                        const assinatura = new Assinatura();
                        const componenteDigital = new ComponenteDigital();
                        componenteDigital.id = componenteDigitalId;
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            operacaoId: operacaoId
                        }));
                    });
                });
            }
        });
    }

    doAbort(): void {
        this._store.dispatch(new fromStoreTarefas.ChangeSelectedTarefas([]));
    }
}
