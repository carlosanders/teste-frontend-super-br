import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ViewContainerRef, OnDestroy,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input
} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromStore from './store';
import { Etiqueta, VinculacaoEtiqueta, Documento, Usuario, DocumentoAvulso } from '@cdk/models';
import { CreateVinculacaoEtiqueta, DeleteVinculacaoEtiqueta } from './store';
import { getMaximizado } from '../store/selectors';
import { ToggleMaximizado } from '../store/actions';
import { Router } from '@angular/router';
import { getRouterState } from '../../../../store/reducers';
import { takeUntil } from 'rxjs/operators';
import { Pagination } from '@cdk/models/pagination';
import { LoginService } from '../../../auth/login/login.service';
import { getScreenState } from 'app/store/reducers';
import { DynamicService } from '../../../../../modules/dynamic.service';
import { modulesConfig } from 'modules/modules-config';

@Component({
    selector: 'oficio-detail',
    templateUrl: './oficio-detail.component.html',
    styleUrls: ['./oficio-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class OficioDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;

    screen$: Observable<any>;

    documentos$: Observable<Documento[]>;
    documentos: Documento[];

    routerState: any;

    accept = 'application/pdf';

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    maximizado$: Observable<boolean>;
    maximizado = false;

    vinculacaoEtiquetaPagination: Pagination;

    private _profile: Usuario;

    mobileMode = false;
    mode = 'entrada';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     * @param _dynamicService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.OficioDetailAppState>,
        private _loginService: LoginService,
        private _dynamicService: DynamicService
    ) {
        this._profile = _loginService.getUserProfile();
        this.documentoAvulso$ = this._store.pipe(select(fromStore.getDocumentoAvulso));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
            'modalidadeEtiqueta.valor': 'eq:OFICIO'
        };
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/oficios/oficio-detail';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

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
            select(getRouterState),
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            if (routerState) {
                this.mode = routerState.state.params['oficioTargetHandle'];
            }
        });

        this.documentoAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentoAvulso => {
            this.documentoAvulso = documentoAvulso;
        });
        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => this.documentos = documentos
        );

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            maximizado => this.maximizado = maximizado
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
            } else {
                this.mobileMode = false;
            }
        });
    }

    ngOnDestroy(): void {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    submit(): void {

    }

    /**
     * Deselect current mail
     */
    deselectCurrentOficio(): void {
        this._store.dispatch(new fromStore.DeselectDocumentoAvulsoAction());
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new CreateVinculacaoEtiqueta({documentoAvulso: this.documentoAvulso, etiqueta: etiqueta}));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            documentoAvulsoId: this.documentoAvulso.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    complete(pending: number): void {
        if (pending === 0) {
            this._store.dispatch(new fromStore.GetDocumentos({
                id: 'eq:' + this.documentoAvulso.id
            }));
        }
    }

    onUploadClick(): void {
        this.cdkUpload.onClick();
    }

    doToggleMaximizado(): void {
        this._store.dispatch(new ToggleMaximizado());
    }
}
