import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ViewContainerRef, OnDestroy,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation
} from '@angular/core';

import {Tarefa} from '@cdk/models/tarefa.model';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {CreateVinculacaoEtiqueta, DeleteVinculacaoEtiqueta} from './store';
import {Documento} from '@cdk/models/documento.model';
import {getMaximizado} from '../store/selectors';
// import {ToggleMaximizado} from '../store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Pagination} from '@cdk/models/pagination';
import {LoginService} from '../../../auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {ToggleMaximizado} from '../../tarefas/store/actions';
import {DocumentoAvulso} from '../../../../../@cdk/models/documento-avulso.model';
import {Usuario} from '../../../../../@cdk/models/usuario.model';

// import {Usuario} from "../../../../../@cdk/models/usuario.model";

@Component({
    selector: 'oficio-detail',
    templateUrl: './oficio-detail.component.html',
    styleUrls: ['./oficio-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OficioDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    mobileMode = false;
    screen$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject();
    maximizado$: Observable<boolean>;

    documentoAvulso$: Observable<DocumentoAvulso>;
    private documentoAvulso: DocumentoAvulso;
    vinculacaoEtiquetaPagination: Pagination;
    private _profile: Usuario;


    constructor(
        protected _store: Store<fromStore.OficioDetailAppState>,
        protected _loginService: LoginService,
    ) {
        this.initProfile();
        this.maximizado$ = this._store.pipe(select(getMaximizado));
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.optionScreen();
        this.pagination();
    }

    private initProfile(): void {
        this._profile = this._loginService.getUserProfile();
    }

    public pagination(): void {
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
            'modalidadeEtiqueta.valor': 'eq:TAREFA'
        };
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            documentoAvulsoId: this.documentoAvulso.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    public optionScreen(): void {
        this.screen$ = this._store.pipe(select(getScreenState));
        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    doToggleMaximizado(): void {
        this._store.dispatch(new ToggleMaximizado());
    }

    /**
     * Deselect current mail
     */
    deselectCurrentTarefa(): void {
        this._store.dispatch(new fromStore.DeselectDocumentoAvulsoAction());
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new CreateVinculacaoEtiqueta({documentoAvulso: this.documentoAvulso, etiqueta}));
    }

    // private _unsubscribeAll: Subject<any> = new Subject();
    //
    // tarefa$: Observable<Tarefa>;
    // tarefa: Tarefa;
    //
    // screen$: Observable<any>;
    //
    // documentos$: Observable<Documento[]>;
    // documentos: Documento[];
    //
    // routerState: any;
    //
    // accept = 'application/pdf';
    //
    // @ViewChild('ckdUpload', {static: false})
    // cdkUpload;
    //
    // maximizado$: Observable<boolean>;
    // maximizado = false;
    //
    // vinculacaoEtiquetaPagination: Pagination;
    //
    // private _profile: Usuario;
    //
    // mobileMode = false;
    //
    // @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) container: ViewContainerRef;
    //
    // /**
    //  * @param _changeDetectorRef
    //  * @param _router
    //  * @param _store
    //  * @param _loginService
    //  * @param _dynamicService
    //  */
    // constructor(
    //     private _changeDetectorRef: ChangeDetectorRef,
    //     private _router: Router,
    //     private _store: Store<fromStore.TarefaDetailAppState>,
    //     private _loginService: LoginService,
    //     private _dynamicService: DynamicService
    // ) {
    //     this._profile = _loginService.getUserProfile();
    //     this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
    //     this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
    //     this.maximizado$ = this._store.pipe(select(getMaximizado));
    //     this.screen$ = this._store.pipe(select(getScreenState));
    //     this.vinculacaoEtiquetaPagination = new Pagination();
    //     this.vinculacaoEtiquetaPagination.filter = {
    //         'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
    //         'modalidadeEtiqueta.valor': 'eq:TAREFA'
    //     };
    // }
    //
    // ngAfterViewInit(): void {
    //     const path = 'app/main/apps/tarefas/tarefa-detail';
    //     modulesConfig.forEach((module) => {
    //         if (module.components.hasOwnProperty(path)) {
    //             module.components[path].forEach((c => {
    //                 this._dynamicService.loadComponent(c)
    //                     .then( componentFactory  => this.container.createComponent(componentFactory));
    //             }));
    //         }
    //     });
    // }
    //
    // ngOnInit(): void {
    //
    //     this._store.pipe(
    //         select(getRouterState),
    //         takeUntil(this._unsubscribeAll)
    //     ).subscribe(routerState => {
    //         if (routerState) {
    //             this.routerState = routerState.state;
    //         }
    //     });
    //     this.tarefa$.pipe(
    //         takeUntil(this._unsubscribeAll)
    //     ).subscribe(tarefa => {
    //         this.tarefa = tarefa;
    //     });
    //     this.documentos$.pipe(
    //         takeUntil(this._unsubscribeAll)
    //     ).subscribe(
    //         documentos => this.documentos = documentos
    //     );
    //
    //     this.maximizado$.pipe(
    //         takeUntil(this._unsubscribeAll)
    //     ).subscribe(
    //         maximizado => this.maximizado = maximizado
    //     );
    //
    //     this.screen$.pipe(
    //         takeUntil(this._unsubscribeAll)
    //     ).subscribe(screen => {
    //         if (screen.size !== 'desktop') {
    //             this.mobileMode = true;
    //         } else {
    //             this.mobileMode = false;
    //         }
    //     });
    // }
    //
    // ngOnDestroy(): void {
    //
    //     // Unsubscribe from all subscriptions
    //     this._unsubscribeAll.next();
    //     this._unsubscribeAll.complete();
    // }
    //
    // // -----------------------------------------------------------------------------------------------------
    // // @ Lifecycle hooks
    // // -----------------------------------------------------------------------------------------------------
    //
    // submit(): void {
    //
    // }
    //
    // /**
    //  * Deselect current mail
    //  */
    // deselectCurrentTarefa(): void {
    //     this._store.dispatch(new fromStore.DeselectTarefaAction());
    //     // this.doToggleMaximizado();
    // }
    //
    // onEtiquetaCreate(etiqueta: Etiqueta): void {
    //     this._store.dispatch(new CreateVinculacaoEtiqueta({tarefa: this.tarefa, etiqueta: etiqueta}));
    // }
    //
    // onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
    //     this._store.dispatch(new DeleteVinculacaoEtiqueta({
    //         tarefaId: this.tarefa.id,
    //         vinculacaoEtiquetaId: vinculacaoEtiqueta.id
    //     }));
    // }
    //
    // complete(pending: number): void {
    //     if (pending === 0) {
    //         this._store.dispatch(new fromStore.GetDocumentos({
    //             'tarefaOrigem.id': 'eq:' + this.tarefa.id
    //         }));
    //     }
    // }
    //
    // doCiencia(): void {
    //     this._store.dispatch(new fromStore.DarCienciaTarefa(this.tarefa));
    // }
    //
    // doCreateTarefa(): void {
    //     this._router.navigate([this.routerState.url.split('/tarefa/')[0] + '/criar/' + this.tarefa.processo.id]).then();
    // }
    //
    // onUploadClick(): void {
    //     this.cdkUpload.onClick();
    // }
    //
    // doToggleMaximizado(): void {
    //     this._store.dispatch(new ToggleMaximizado());
    // }
}
