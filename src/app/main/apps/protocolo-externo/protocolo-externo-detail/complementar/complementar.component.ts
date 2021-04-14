import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromStore from './store';
import { LoginService } from 'app/main/auth/login/login.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Documento } from '@cdk/models/documento.model';
import { getRouterState } from 'app/store/reducers';
import { Router } from '@angular/router';
import {Assinatura, ComponenteDigital, Processo, Usuario} from '@cdk/models';
import { getProcesso } from '../store/selectors';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {DynamicService} from '../../../../../../modules/dynamic.service';

@Component({
    selector: 'complementar',
    templateUrl: './complementar.component.html',
    styleUrls: ['./complementar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class ComplementarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    processo$: Observable<Processo>;
    processo: Processo;

    documentos$: Observable<Documento[]>;

    selectedDocumentos$: Observable<Documento[]>;
    oficios: Documento[] = [];
    selectedDocumentos: Documento[] = [];

    processoOrigem: number;

    mode: string;
    tipo = 'complementar';
    chaveAcesso: any;

    routerState: any;
    routerState$: Observable<any>;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;


    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     * @param _dynamicService
     */
    constructor(
        private _store: Store<fromStore.ComplementarAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService
    ) {
        this._profile = this._loginService.getUserProfile();
        this.processo$ = this._store.pipe(select(getProcesso));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.routerState$ = this._store.pipe(select(getRouterState));

        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
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

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.processoOrigem = routerState.state.params['processoHandle'];
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => {
            this.processo = processo;
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => {
                this.oficios = documentos;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedDocumentos => {
            this.selectedDocumentos =  selectedDocumentos;
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/protocolo-externo/protocolo-externo-detail/complementar';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    complementarDocumento(): void {
        this.cdkUpload.upload();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDelete(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumento(documentoId));
    }

    doVerResposta(documento): void {
        const chaveAcesso = this.routerState.params.chaveAcessoHandle ? '/' + this.routerState.params.chaveAcessoHandle : '';

        this._router.navigate([
            this.routerState.url.split('/detalhe/')[0] + '/documento/' + documento.componentesDigitais[0].id + '/visualizar' + chaveAcesso
        ]);
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

                this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                    documentoId: result.documento.id,
                    assinatura: assinatura,
                    plainPassword: result.plainPassword,
                    processoId: this.processo.id
                }));
            });
        }
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
    }

    onClicked(documento): void {
        const chaveAcesso = this.routerState.params.chaveAcessoHandle ? '/' + this.routerState.params.chaveAcessoHandle : '';

        this._router.navigate([
            this.routerState.url.split('/detalhe/')[0] + '/documento/' + documento.componentesDigitais[0].id + '/visualizar' + chaveAcesso
        ]);
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentos({'processoOrigem.id': `eq:${this.processo.id}`}));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    doDownloadP7S(documento: Documento): void {
        documento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
            this._store.dispatch(new fromStore.DownloadToP7S(componenteDigital.id));
        });
    }
}
