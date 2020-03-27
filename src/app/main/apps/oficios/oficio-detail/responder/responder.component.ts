import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromStore from './store';
import { LoginService } from 'app/main/auth/login/login.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Documento } from '@cdk/models/documento.model';
import { getMercureState, getRouterState } from 'app/store/reducers';
import { Router } from '@angular/router';
import { DocumentoAvulso, Usuario } from '@cdk/models';
import { getDocumentoAvulso } from '../store/selectors';
import { UpdateData } from '@cdk/ngrx-normalizr';
import { documento as documentoSchema } from '@cdk/normalizr/documento.schema';
import { getDocumentosComplementares } from '../complementar/store/selectors';

@Component({
    selector: 'responder',
    templateUrl: './responder.component.html',
    styleUrls: ['./responder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ResponderComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;
    documentos$: Observable<Documento[]>;
    documentosComplementares$: Observable<Documento[]>;

    selectedDocumentos$: Observable<Documento[]>;
    oficios: Documento[] = [];
    selectedOficios: Documento[] = [];

    documentoAvulsoOrigem: number;

    mode: string;
    chaveAcesso: any;

    routerState: any;
    routerState$: Observable<any>;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    javaWebStartOK = false;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.ResponderAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this._profile = this._loginService.getUserProfile();
        this.documentoAvulso$ = this._store.pipe(select(getDocumentoAvulso));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.documentosComplementares$ = this._store.pipe(select(getDocumentosComplementares));

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
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._store.pipe(
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

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.mode = routerState.state.params['oficioTargetHandle'];
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.documentoAvulsoOrigem = routerState.state.params['documentoAvulsoHandle'];
        });

        this.documentoAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentoAvulso => {
            this.documentoAvulso = documentoAvulso;
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => {
                this.oficios = documentos;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.documentosComplementares$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentosComplementares => {
                this.oficios = this.oficios.concat(documentosComplementares);
                this._changeDetectorRef.markForCheck();
            }
        );

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedDocumentos => {
            this.selectedOficios = selectedDocumentos;
        });

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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    responderDocumento(): void {
        this.cdkUpload.upload();
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
        this._store.dispatch(new fromStore.GetDocumentoResposta({id: `eq:${this.documentoAvulso.id}`}));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }
}

