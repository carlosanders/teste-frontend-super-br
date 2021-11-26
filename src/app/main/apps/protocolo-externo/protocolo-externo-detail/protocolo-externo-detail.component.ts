import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {Documento, Etiqueta, Pagination, Processo, Usuario, VinculacaoEtiqueta} from '@cdk/models';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {CreateVinculacaoEtiqueta, DeleteVinculacaoEtiqueta, SaveConteudoVinculacaoEtiqueta} from './store';
import {getMaximizado, ToggleMaximizado} from '../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {expandirTela} from './store/selectors/processo.selectors';

@Component({
    selector: 'protocolo-externo-detail',
    templateUrl: './protocolo-externo-detail.component.html',
    styleUrls: ['./protocolo-externo-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloExternoDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    screen$: Observable<any>;

    documentos$: Observable<Documento[]>;
    documentos: Documento[];

    routerState: any;

    accept = 'application/pdf';

    maximizado$: Observable<boolean>;
    maximizado = false;

    expandir$: Observable<boolean>;

    vinculacaoEtiquetaPagination: Pagination;

    mobileMode = false;

    private _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

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
        private _store: Store<fromStore.ProcessoDetailAppState>,
        public _loginService: LoginService,
        private _dynamicService: DynamicService
    ) {
        this._profile = this._loginService.getUserProfile();
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.expandir$ = this._store.pipe(select(expandirTela));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.processo$.pipe(
            filter(processo => !!processo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentos => this.documentos = documentos);

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(maximizado => this.maximizado = maximizado);

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });

        this.expandir$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((expandir) => {
            this.doToggleMaximizado(expandir);
        });

        this.doToggleMaximizado(false);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.doToggleMaximizado(false);
        this._unsubscribeAll.next(true);
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
    deselectCurrentProcesso(): void {
        this._store.dispatch(new fromStore.DeselectProcessoAction());
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new CreateVinculacaoEtiqueta({processo: this.processo, etiqueta: etiqueta}));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        }));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            processoId: this.processo.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    complete(pending: number): void {
        if (pending === 0) {
            this._store.dispatch(new fromStore.GetDocumentos({
                'processoOrigem.id': 'eq:' + this.processo.id,
                'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
            }));
        }
    }

    doCiencia(): void {
        this._store.dispatch(new fromStore.DarCienciaProcesso(this.processo));
    }

    doCreateProcesso(): void {
        this._router.navigate([this.routerState.url.split('/processo/')[0] + '/criar/' + this.processo.id]).then();
    }

    doToggleMaximizado(valor: boolean): void {
        this._store.dispatch(new ToggleMaximizado(valor));
    }
}
