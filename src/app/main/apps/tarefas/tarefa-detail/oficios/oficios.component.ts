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

import {Assinatura, Colaborador, Documento, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getDocumentosHasLoaded} from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getTarefa} from '../store/selectors';
import {filter, takeUntil} from 'rxjs/operators';
import {getMercureState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Back} from '../../../../../store/actions';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {FormBuilder} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'tarefa-detail-oficios',
    templateUrl: './oficios.component.html',
    styleUrls: ['./oficios.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class OficiosComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    loadedOficios: any;

    errorEditor$: Observable<any>;
    loading$: Observable<boolean>;

    private _profile: Colaborador;

    routerState: any;

    documentos$: Observable<Documento[]>;
    oficios: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedOficios: Documento[] = [];
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    javaWebStartOK = false;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    routeOficioDocumento = 'oficio';

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;

    assinaturaInterval = null;

        /**
         *
         * @param _store
         * @param _loginService
         * @param _router
         * @param _changeDetectorRef
         * @param _dynamicService
         * @param _formBuilder
         * @param _snackBar
         */
    constructor(
        private _store: Store<fromStore.TarefaOficiosAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar
    ) {
        this.tarefa$ = this._store.pipe(select(getTarefa));
        this._profile = _loginService.getUserProfile().colaborador;
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        this.errorEditor$ = this._store.pipe(select(fromStore.getComponentesDigitaisErrors));

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));

        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));

        this._store.pipe(select(getDocumentosHasLoaded)).subscribe(
            loaded => this.loadedOficios = loaded
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(tarefa => !!tarefa)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._store
            .pipe(
                select(getMercureState),
                takeUntil(this._unsubscribeAll)
            ).subscribe((message) => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoSuccess(message.content.documentoId));
                        this._store.dispatch(new UpdateData<Documento>({
                            id: message.content.documentoId,
                            schema: documentoSchema,
                            changes: {assinado: true}
                        }));
                        break;
                }
            }
        });

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedDocumentos) => {
            this.selectedOficios = selectedDocumentos.filter(documento => documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (documentos) => {
                this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa);
                this._changeDetectorRef.markForCheck();
            }
        );

        this.assinandoDocumentosId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((assinandoDocumentosId) => {
            if (assinandoDocumentosId.length > 0) {
                if (this.assinaturaInterval) {
                    clearInterval(this.assinaturaInterval);
                }
                this.assinaturaInterval = setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            } else {
                clearInterval(this.assinaturaInterval);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
        });

        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('oficio') &&
                module.routerLinks[pathDocumento]['oficio'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeOficioDocumento = module.routerLinks[pathDocumento]['oficio'][this.routerState.params.generoHandle];
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas/tarefa-detail/oficios';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadDocumentos());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    oficio(): void {
        this._router.navigate([this.routerState.url.split('/oficios')[0] + '/oficio']).then();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDeleteBloco(documentos: Documento[]): void {
        this.lote = CdkUtils.makeId();
        documentos.forEach((documento: Documento) => this.doDelete(documento.id, this.lote));
    }

    doDelete(documentoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        const documento = new Documento();
        documento.id = documentoId;
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documento.id,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStore.DeleteDocumento({
                    documentoId: documento.id,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DeleteDocumentoFlush()
            ],
            undo: new fromStore.UndeleteDocumento({
                documento: documento,
                operacaoId: operacaoId,
                loaded: this.loadedOficios,
                redo: null,
                undo: null
            })
        }));

        if (this.snackSubscription) {
            // temos um snack aberto, temos que ignorar
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletando'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteDocumentoCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteDocumentoFlush());
            }
        });
    }

    doRestaurar(documentoId): void {
        const operacaoId = CdkUtils.makeId();
        const documento = new Documento();
        documento.id = documentoId;
        this._store.dispatch(new fromStore.UndeleteDocumento({
            documento: documento,
            operacaoId: operacaoId,
            redo: null,
            undo: null
        }));
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumento(values));
    }

    doAssinatura(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumento(result.documento.id));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';
                assinatura.plainPassword = result.plainPassword;

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    operacaoId: operacaoId
                }));
            });
        }
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento({
            documento: documento,
            routeOficio: this.routeOficioDocumento
        }));
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentos());
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
