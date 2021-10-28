import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {Documento, Etiqueta, Pagination, Tarefa, Usuario, VinculacaoEtiqueta} from '@cdk/models';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {
    DeleteVinculacaoEtiqueta,
    expandirTela,
    getEtiqueta,
    SaveConteudoVinculacaoEtiqueta,
    SaveEtiqueta
} from './store';
import {DarCienciaTarefaCancel, DarCienciaTarefaFlush, getMaximizado, ToggleMaximizado} from '../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {CdkUtils} from '@cdk/utils';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'tarefa-detail',
    templateUrl: './tarefa-detail.component.html',
    styleUrls: ['./tarefa-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaDetailComponent implements OnInit, OnDestroy {

    @ViewChild('dynamicComponent', {read: ViewContainerRef}) container: ViewContainerRef;
    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;
    errorsAddEtiqueta$: Observable<any>;
    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];
    vinculacaoEtiquetaPagination: Pagination;
    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    showEtiqueta = false;
    habilitarOpcaoBtnAddEtiqueta = true;
    placeholderEtiq = 'Adicionar etiquetas na tarefa';
    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    expandir$: Observable<boolean>;
    screen$: Observable<any>;
    documentos$: Observable<Documento[]>;
    documentos: Documento[];
    pluginLoading$: Observable<string[]>;
    pluginLoading: string[];
    routerState: any;
    accept = 'application/pdf';
    maximizado$: Observable<boolean>;
    maximizado = false;
    mobileMode = false;
    routeAtividade = 'atividades/criar';
    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;
    novaAba = false;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     * @param _dynamicService
     * @param _snackBar
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TarefaDetailAppState>,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _snackBar: MatSnackBar
    ) {
        this._profile = _loginService.getUserProfile();
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.expandir$ = this._store.pipe(select(expandirTela));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                }
            ]
        };

        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.errorsAddEtiqueta$ = this._store.pipe(select(fromStore.getEtiquetaError));
        this.pluginLoading$ = this._store.pipe(select(fromStore.getPluginLoading));
    }

    iniciaModulos(): void {
        if (this.container) {
            this.container.clear();
        }
        const path = 'app/main/apps/tarefas/tarefa-detail';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }

            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividades') &&
                module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividade = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
            }
        });
        this._changeDetectorRef.markForCheck();
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription && this.routerState?.url.indexOf('operacoes-bloco') === -1) {
                this.sheetRef.dismiss();
            }

            if (routerState.state.queryParams['novaAba']) {
                this.novaAba = true;
                this.doToggleMaximizado(this.novaAba);
            }
            this.routerState = routerState.state;

        });

        this.tarefa$.pipe(
            filter(tarefa => !!tarefa),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            if (!this.tarefa || this.tarefa.id !== tarefa.id) {
                this.iniciaModulos();
            }
            this.tarefa = tarefa;
            this.vinculacoesEtiquetas = tarefa.vinculacoesEtiquetas.filter((vinculacaoEtiqueta: VinculacaoEtiqueta) => !vinculacaoEtiqueta.etiqueta.sistema);
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
        this.expandir$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (expandir) => {
                if (expandir || !this.novaAba) {
                    this.doToggleMaximizado(expandir);
                }
            }
        );
        this.pluginLoading$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            pluginLoading => this.pluginLoading = pluginLoading
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
        this.doToggleMaximizado(this.novaAba);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.doToggleMaximizado(false);
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
    deselectCurrentTarefa(): void {
        this._store.dispatch(new fromStore.DeselectTarefaAction());
    }

    onVinculacaoEtiquetaCreate(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({
            tarefa: this.tarefa,
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    onVinculacaoEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        }));
    }

    onVinculacaoEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            tarefaId: this.tarefa.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new SaveEtiqueta({
            etiqueta: etiqueta,
            tarefa: this.tarefa,
            operacaoId: operacaoId
        }));
        this.etiqueta = null;
        this.showEtiqueta = false;
    }

    complete(pending: number): void {
        if (pending === 0) {
            this._store.dispatch(new fromStore.GetDocumentos({
                'tarefaOrigem.id': 'eq:' + this.tarefa.id
            }));
        }
    }

    doCiencia(): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DarCienciaTarefa({
            tarefa: this.tarefa,
            operacaoId: operacaoId,
            loteId: null,
            redo: [
                new fromStore.DarCienciaTarefa({
                    tarefa: this.tarefa,
                    operacaoId: operacaoId,
                    loteId: null,
                    redo: 'inherent',
                    // redo e undo são herdados da ação original
                    url: this._router.url
                }),
                new fromStore.DarCienciaTarefaFlush(),
                new DarCienciaTarefaFlush()
            ],
            url: this._router.url,
            undo: null
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
                icon: 'check',
                text: 'Dando ciência'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DarCienciaTarefaCancel());
                this._store.dispatch(new DarCienciaTarefaCancel());
            } else {
                this._store.dispatch(new fromStore.DarCienciaTarefaFlush());
                this._store.dispatch(new DarCienciaTarefaFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscription = null;
        });
    }

    doCreateTarefa(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/criar/' + this.tarefa.processo.id
        ]).then();
    }

    doToggleMaximizado(valor: boolean): void {
        this._store.dispatch(new ToggleMaximizado(valor));
    }
}
