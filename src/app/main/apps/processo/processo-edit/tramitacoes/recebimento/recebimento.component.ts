import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState} from 'app/store/reducers';
import * as fromStore from './store';
import {Observable, Subject} from 'rxjs';
import {Pagination, Tramitacao, Usuario} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../../../auth/login/login.service';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'recebimento',
    templateUrl: './recebimento.component.html',
    styleUrls: ['./recebimento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RecebimentoComponent implements OnInit, OnDestroy {

    routerState: any;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    setorAtualPagination: Pagination;
    setorAtualPaginationTree: Pagination;

    tramitacao$: Observable<Tramitacao>;
    tramitacao: Tramitacao;

    _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.RecebimentoAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this._profile = this._loginService.getUserProfile();

        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tramitacao$ = this._store.pipe(select(fromStore.getTramitacao));

        this.setorAtualPagination = new Pagination();
        this.setorAtualPagination.populate = ['unidade', 'parent'];
        this.setorAtualPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};

        this.setorAtualPaginationTree = new Pagination();
        this.setorAtualPaginationTree.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(',')};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.tramitacao$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tramitacao => this.tramitacao = tramitacao);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(values): void {
        const tramitacao = new Tramitacao();
        tramitacao.id = this.tramitacao.id;
        tramitacao.setorAtual = values.setorAtual;
        tramitacao.usuarioRecebimento = this._profile;

        const changes = {
            setorAtual: tramitacao.setorAtual.id,
            usuarioRecebimento: tramitacao.usuarioRecebimento.id
        };

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.ReceberTramitacaoProcesso({
            tramitacao: tramitacao,
            changes: changes,
            operacaoId: operacaoId
        }));
    }

    cancel(): void {
        this._router.navigate(['apps/processo/' + this.routerState.params.processoHandle + '/editar/tramitacoes']).then();
    }
}
