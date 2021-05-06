import {
    AfterViewInit,
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
    CreateVinculacaoEtiqueta,
    DeleteVinculacaoEtiqueta,
    getEtiqueta, getEtiquetaError,
    SaveConteudoVinculacaoEtiqueta,
    SaveEtiqueta
} from './store';
import {getMaximizado} from '../store/selectors';
import {DarCienciaTarefaCancel, DarCienciaTarefaFlush, ToggleMaximizado} from '../store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {expandirTela} from './store/selectors/processo.selectors';
import {CdkUtils} from '../../../../../@cdk/utils';
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
export class TarefaDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

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

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    maximizado$: Observable<boolean>;
    maximizado = false;

    private _profile: Usuario;

    mobileMode = false;

    routeAtividade = 'atividades/criar';

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

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

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas/tarefa-detail';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => this.container.createComponent(componentFactory));
                }));
            }

            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividades') &&
                module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividade = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
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
        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefa => {
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
            expandir => {
                this.doToggleMaximizado(expandir);
            }
        );
        this.pluginLoading$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            pluginLoading => this.pluginLoading = pluginLoading
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            this.mobileMode = screen.size !== 'desktop';
        });
        this.doToggleMaximizado(false);
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
        // this.doToggleMaximizado();
    }

    onVinculacaoEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new CreateVinculacaoEtiqueta({tarefa: this.tarefa, etiqueta: etiqueta}));
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
        this._store.dispatch(new SaveEtiqueta({etiqueta: etiqueta, tarefa: this.tarefa}));
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
                text: 'Ciência'
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
        });
    }

    doCreateTarefa(): void {
        this._router.navigate([this.routerState.url.split('/tarefa/')[0] + '/criar/' + this.tarefa.processo.id]).then();
    }

    onUploadClick(): void {
        this.cdkUpload.onClick();
    }

    doToggleMaximizado(valor: boolean): void {
        this._store.dispatch(new ToggleMaximizado(valor));
    }
}
