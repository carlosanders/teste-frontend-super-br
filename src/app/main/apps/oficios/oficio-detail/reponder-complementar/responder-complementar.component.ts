import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {Atividade} from '@cdk/models/atividade.model';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getDocumentos} from './store/selectors';
import {filter, takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models/documento.model';
import {getMercureState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Colaborador} from '../../../../../../@cdk/models/colaborador.model';
import {DocumentoAvulso} from '../../../../../../@cdk/models';
import {getDocumentoAvulso} from '../../store/selectors';


@Component({
    selector: 'responder-complementar',
    templateUrl: './responder-complementar.component.html',
    styleUrls: ['./responder-complementar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResponderComplementarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    public action: string;

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
    convertendoDocumentosId: number[] = [];
    javaWebStartOK = false;
    public documentoOrigem;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.ResponderComplementarAppState>,
        private _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
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
                        break;
                }
            }
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
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
        });
        this.getDocumentOrigem();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getDocumentOrigem(): void {
        this.documentoOrigem = this.routerState.params.documentoAvulsoHandle;
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
        atividade.documentos = this.minutas;

    }

    // upload(): void {
    //     this.cdkUpload.upload();
    // }

    responderDocumento(): void {
        this.cdkUpload.upload();
        this.action = 'responder';
    }

    complementarDocumento(): void {
        this.cdkUpload.upload();
        this.action = 'complementar';
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentos());
    }

    // modelo(): void {
    //     this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/modelo']).then();
    // }
    //
    // oficio(): void {
    //     this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/oficio']).then();
    // }
    //
    // changedSelectedIds(selectedIds): void {
    //     this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    // }
    //
    // doDelete(documentoId): void {
    //     this._store.dispatch(new fromStore.DeleteDocumento(documentoId));
    // }
    //
    // doVerResposta(documento): void {
    //     this._store.dispatch(new fromStore.ClickedDocumento(documento));
    // }
    //
    // doAssinatura(documentoId): void {
    //     this._store.dispatch(new fromStore.AssinaDocumento(documentoId));
    // }
    //
    // onClicked(documento): void {
    //     this._store.dispatch(new fromStore.ClickedDocumento(documento));
    // }

    //
    // doConverte(documentoId): void {
    //     this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    // }



}
