import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Etiqueta, Pagination, Processo, Usuario, VinculacaoEtiqueta} from '../../../../../@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStoreProcesso from '../../processo/store';
import * as fromStore from './store';
import {LoginService} from '../../../auth/login/login.service';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {
    CreateVinculacaoEtiqueta,
    DeleteVinculacaoEtiqueta,
    getMaximizado,
    SaveConteudoVinculacaoEtiqueta, ToggleMaximizado
} from './store';
import {getRouterState, getScreenState} from '../../../../store/reducers';
import {modulesConfig} from '../../../../../modules/modules-config';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-arquivista-detail',
    templateUrl: './arquivista-detail.component.html',
    styleUrls: ['./arquivista-detail.component.scss']
})
export class ArquivistaDetailComponent implements OnInit, OnDestroy, AfterViewInit {
    private _unsubscribeAll: Subject<any> = new Subject();

    savingVincEtiquetaId$: Observable<any>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    screen$: Observable<any>;

    routerState: any;

    accept = 'application/pdf';

    maximizado$: Observable<boolean>;
    maximizado = false;

    vinculacaoEtiquetaPagination: Pagination;

    private _profile: Usuario;

    mobileMode = false;


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
        private _store: Store<fromStore.ArquivistaDetailAppState>,
        private _loginService: LoginService,
        private _dynamicService: DynamicService
    ) {
        this._profile = _loginService.getUserProfile();
        this.processo$ = this._store.pipe(select(fromStoreProcesso.getProcesso));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
            'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
        };

        this.savingVincEtiquetaId$ = this._store.pipe(select(fromStoreProcesso.getSavingVincEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    // ngAfterViewInit(): void {
    //     const path = 'app/main/apps/arquivista/arquivista-detail';
    //     modulesConfig.forEach((module) => {
    //         if (module.components.hasOwnProperty(path)) {
    //             module.components[path].forEach((c => {
    //                 this._dynamicService.loadComponent(c)
    //                     .then(componentFactory => this.container.createComponent(componentFactory));
    //             }));
    //         }
    //     });
    // }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => {
            this.processo = processo;
        });

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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new CreateVinculacaoEtiqueta({processo: this.processo, etiqueta: etiqueta}));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo}
        }));
    }

    /**
     * Deselect current mail
     */
    deselectCurrentProcesso(): void {
        this._store.dispatch(new fromStore.DeselectTarefaAction());
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            processoId: this.processo.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }


    doToggleMaximizado(): void {
        this._store.dispatch(new ToggleMaximizado());
    }

    setRouteClassificacao() {
        return this.processo.id + '/classificacao';
    }

    setRouteRealizarTransacao() {
        return this.processo.id + '/realizar-transicao/criar';
    }

    setRouteLembrete() {
        return this.processo.id + '/lembretes';
    }

    isDataProntaParaTransicao() {
        return this.processo.dataHoraProximaTransicao;
    }

    ngAfterViewInit(): void {
    }

    isPendenciaAnalise(): boolean{
        return this.routerState.params.typeHandle === 'pendencia-analise' ? true : false;
    }
}
