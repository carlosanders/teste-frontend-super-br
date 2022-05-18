import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Etiqueta, ModalidadeTransicao, Pagination, Processo, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStoreProcesso from '../../processo/store';
import * as fromStore from './store';
import {
    CreateVinculacaoEtiqueta,
    DeleteVinculacaoEtiqueta,
    expandirTela,
    getMaximizado,
    SaveConteudoVinculacaoEtiqueta,
    ToggleMaximizado
} from './store';
import {LoginService} from '../../../auth/login/login.service';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {getRouterState, getScreenState} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';
import {getModalidadeTransicao} from '../arquivista-list/store';
import moment from 'moment';

@Component({
    selector: 'arquivista-detail',
    templateUrl: './arquivista-detail.component.html',
    styleUrls: ['./arquivista-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaDetailComponent implements OnInit, OnDestroy, AfterViewInit {
    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;
    processo$: Observable<Processo>;
    processo: Processo;
    screen$: Observable<any>;
    routerState: any;
    accept = 'application/pdf';
    maximizado$: Observable<boolean>;
    maximizado = false;
    expandir$: Observable<boolean>;
    vinculacaoEtiquetaPagination: Pagination;
    mobileMode = false;
    modalidadeTransicao$: Observable<ModalidadeTransicao>;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

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
        this.expandir$ = this._store.pipe(select(expandirTela));
        this.screen$ = this._store.pipe(select(getScreenState));

        this.modalidadeTransicao$ = this._store.pipe(select(getModalidadeTransicao));

        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                }
            ]
        };

        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStoreProcesso.getSavingVinculacaoEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.processo$.pipe(
            filter(processo => !!processo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            maximizado => this.maximizado = maximizado
        );

        this.expandir$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (expandir) => {
                this.doToggleMaximizado(expandir);
            }
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });

        this.doToggleMaximizado(false);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
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
            changes: {conteudo: values.conteudo, privada: values.privada}
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

    doToggleMaximizado(valor: boolean): void {
        this._store.dispatch(new ToggleMaximizado(valor));
    }

    isDataProntaParaTransicao(): moment.Moment {
        return this.processo.dataHoraProximaTransicao;
    }

    ngAfterViewInit(): void {
    }

    isPendenciaAnalise(): boolean {
        return this.routerState.params.typeHandle === 'pendencia-analise';
    }
}
