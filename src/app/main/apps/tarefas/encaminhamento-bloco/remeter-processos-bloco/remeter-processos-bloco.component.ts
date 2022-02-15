import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Colaborador, Pagination, Processo, Tramitacao, Pessoa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {getOperacoes, getRouterState} from '../../../../../store';
import {getProcessosEncaminhamento} from '../store';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'remeter-processos-bloco',
    templateUrl: './remeter-processos-bloco.component.html',
    styleUrls: ['./remeter-processos-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RemeterProcessosBlocoComponent implements OnInit, OnDestroy {

    tramitacao: Tramitacao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;
    pessoaDestino: Pessoa;

    setorOrigemPagination: Pagination;
    setorOrigemPaginationTree: Pagination;

    processos$: Observable<Processo[]>;
    processos: Processo[];

    routerState: any;

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    operacaoId?: string;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _changeDetectorRef
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RemessaBlocoAppState>,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(getProcessosEncaminhamento));
        this._profile = _loginService.getUserProfile().colaborador;

        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPaginationTree = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.setorOrigemPaginationTree.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(',')};
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.operacaoId = null;
        this.operacoes = [];

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe((p) => {
            this.processos = p;
        });

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tramitação' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tramitação' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.detectChanges();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onActivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.pessoaDestino = pessoa;
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    gerirPessoaDestino(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa']).then();
    }

    editPessoaDestino(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

    submit(values): void {
        this.operacaoId = CdkUtils.makeId();
        this.lote = CdkUtils.makeId();
        this.processos.forEach((processoBloco) => {

            const tramitacao = new Tramitacao();

            Object.entries(values).forEach(
                ([key, value]) => {
                    tramitacao[key] = value;
                }
            );

            tramitacao.processo = processoBloco;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveTramitacao({
                tramitacao: tramitacao,
                operacaoId: operacaoId,
                loteId: this.lote
            }));
        });
    }

    cancel(): void {
        this._router.navigate([this.routerState.url.split('/remeter-processos-bloco')[0]]).then();
    }
}
