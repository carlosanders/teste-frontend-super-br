import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Atividade} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';

import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Tarefa} from '@cdk/models';
import {getTarefa} from '../../store/selectors';
import {filter, takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models';
import {getRouterState, getMercureState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Colaborador} from '@cdk/models';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';

@Component({
    selector: 'atividade-create',
    templateUrl: './atividade-create.component.html',
    styleUrls: ['./atividade-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AtividadeCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    private _profile: Colaborador;

    routerState: any;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    oficios: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    selectedOficios: Documento[] = [];
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    convertendoDocumentosId$: Observable<number[]>;
    javaWebStartOK = false;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.AtividadeCreateAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefa$ = this._store.pipe(select(getTarefa));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._store
            .pipe(
                select(getMercureState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(message => {
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
                            this._store.dispatch(new UpdateData<Documento>({id: message.content.documentoId, schema: documentoSchema, changes: {assinado: true}}));
                            break;
                    }
                }
            });


        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefa => {
            this.tarefa = tarefa;
            this.atividade.usuario = tarefa.usuarioResponsavel;
            this.atividade.setor = tarefa.setorResponsavel;
        });

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedDocumentos => {
            this.selectedMinutas = selectedDocumentos.filter(documento => documento.minuta && !documento.documentoAvulsoRemessa);
            this.selectedOficios = selectedDocumentos.filter(documento => documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => {
                this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa && !documento.juntadaAtual));
                this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa);
                this._changeDetectorRef.markForCheck();
            }
        );

        this.assinandoDocumentosId$.subscribe(assinandoDocumentosId => {
            if (assinandoDocumentosId.length > 0) {
                setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        delete values.unidadeAprovacao;

        const atividade = new Atividade();

        Object.entries(values).forEach(
            ([key, value]) => {
                atividade[key] = value;
            }
        );

        atividade.tarefa = this.tarefa;
        atividade.documentos = this.minutas;

        this._store.dispatch(new fromStore.SaveAtividade(atividade));
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    modelo(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/modelo']).then();
    }

    oficio(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/oficio']).then();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDelete(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumento(documentoId));
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.AssinaDocumento(documentoId));
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentos());
    }

    doConverte(documentoId): void {
        
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }
}
