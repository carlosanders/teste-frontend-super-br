import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from '../store';
import * as fromDocumentoStore from '../../store';
import {select, Store} from '@ngrx/store';
import {Assinatura, ComponenteDigital} from '@cdk/models';
import {takeUntil} from 'rxjs/operators';
import {getMercureState, getRouterState} from '../../../../../store/reducers';
import {getRepositorioComponenteDigital} from '../../store/selectors';
import {SetQueryRepositorios, SetRepositorioComponenteDigital} from 'app/main/apps/documento/documento-edit/inteligencia/store/actions';
import {SetQueryRepositorios as SetQueryRepositoriosAvulso, SetRepositorioComponenteDigital as SetRepositorioComponenteDigitalAvulso} from 'app/main/apps/documento/documento-avulso-edit/inteligencia/store/actions';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'componente-digital-ckeditor',
    templateUrl: './componente-digital-ckeditor.component.html',
    styleUrls: ['./componente-digital-ckeditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponenteDigitalCkeditorComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    componenteDigital$: Observable<ComponenteDigital>;
    componenteDigital: ComponenteDigital;

    repositorio$: Observable<string>;
    repositorio: string;

    saving$: Observable<boolean>;
    saving = false;

    errors$: Observable<any>;

    routerState: any;

    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    javaWebStartOK = false;

    btVersoes = true;
    logEntryPagination: Pagination;

    mode = 'documento';

    /**
     * @param _changeDetectorRef
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.ComponenteDigitalAppState>
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.saving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.repositorio$ = this._store.pipe(select(getRepositorioComponenteDigital));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromDocumentoStore.getAssinandoDocumentosId));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;

                if (this.routerState.url.indexOf('/documento/') > -1) {
                    this.mode = 'documento';
                }

                if (this.routerState.url.indexOf('/modelo/') > -1) {
                    this.mode = 'modelo';
                }

                if (this.routerState.url.indexOf('/repositorio/') > -1) {
                    this.mode = 'repositorio';
                }

                if (this.routerState.url.indexOf('/template/') > -1) {
                    this.mode = 'template';
                }
            }
        });

        this.componenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(cd => {
            this.componenteDigital = cd;

            if (this.componenteDigital) {
                this.logEntryPagination = new Pagination();
                this.logEntryPagination.filter = {
                    entity: 'SuppCore\\AdministrativoBackend\\Entity\\ComponenteDigital',
                    target: 'hash',
                    id: + this.componenteDigital.id};
            }
        });

        this.saving$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(saving => {
            this.saving = saving;
            this._changeDetectorRef.detectChanges();
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
                        this._store.dispatch(new fromDocumentoStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromDocumentoStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromDocumentoStore.AssinaDocumentoSuccess(message.content.documentoId));
                        break;
                }
            }
        });

        this.assinandoDocumentosId$.subscribe(assinandoDocumentosId => {
            if (assinandoDocumentosId && assinandoDocumentosId.length > 0) {
                setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromDocumentoStore.AssinaDocumentoFailed(documentoId))
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

    doClearRepositorio(): void {
        if (this.routerState.url.indexOf('sidebar:oficio') === -1) {
            this._store.dispatch(new SetRepositorioComponenteDigital(''));
        } else {
            this._store.dispatch(new SetRepositorioComponenteDigitalAvulso(''));
        }
    }

    doQuery(query): void {
        if (this.routerState.url.indexOf('sidebar:oficio') === -1) {
            this._store.dispatch(new SetQueryRepositorios({'documento.componentesDigitais.conteudo': query}));
        } else {
            this._store.dispatch(new SetQueryRepositoriosAvulso({'documento.componentesDigitais.conteudo': query}));
        }
    }

    /**
     * @param data
     */
    doSave(data: any): void {
        this._store.dispatch(new fromStore.SaveComponenteDigital({componenteDigital: this.componenteDigital, data: data.conteudo, hashAntigo: data.hashAntigo}));
    }

    /**
     * @param data
     */
    doReverter(data: any): void {
        this._store.dispatch(new fromStore.RevertComponenteDigital({componenteDigital: this.componenteDigital, hash: data.toString() }));
    }

    /**
     * @param data
     */
    doVisualizar(data: any): void {
        this._store.dispatch(new fromStore.VisualizarVersaoComponenteDigital(data.toString()));
    }

    /**
     * @param data
     */
    doComparar(data: any): void {
        this._store.dispatch(new fromStore.CompararVersaoComponenteDigital(data.toString()));
    }

    doAssinarDigitalmente(): void {
        this._store.dispatch(new fromDocumentoStore.AssinaDocumento());
    }

    doAssinarEletronicamente(password): void {
        const assinatura = new Assinatura();
        assinatura.componenteDigital = this.componenteDigital;
        assinatura.algoritmoHash = 'A1';
        assinatura.cadeiaCertificadoPEM = 'A1';
        assinatura.cadeiaCertificadoPkiPath = 'A1';
        assinatura.assinatura = 'A1';

        this._store.dispatch(new fromDocumentoStore.AssinaDocumentoEletronicamente({
            assinatura: assinatura,
            password: password
        }));
    }

    doPdf(): void {
        this._store.dispatch(new fromStore.DownloadAsPdfComponenteDigital());
    }
}
