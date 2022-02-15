import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Processo, Tramitacao, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import {Back} from '../../../../../../store';
import {LoginService} from '../../../../../auth/login/login.service';
import {takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'tramitacao-edit',
    templateUrl: './tramitacao-edit.component.html',
    styleUrls: ['./tramitacao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TramitacaoEditComponent implements OnInit, OnDestroy {

    tramitacao$: Observable<Tramitacao>;
    tramitacao: Tramitacao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    _profile: Usuario;

    setorOrigemPagination: Pagination;
    setorOrigemPaginationTree: Pagination;

    setorDestinoPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.TramitacaoEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tramitacao$ = this._store.pipe(select(fromStore.getTramitacao));
        this.processo$ = this._store.pipe(select(getProcesso));

        this._profile = this._loginService.getUserProfile();
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};

        this.setorOrigemPaginationTree = new Pagination();
        this.setorOrigemPaginationTree.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(',')};

        this.setorDestinoPagination = new Pagination();
        this.setorDestinoPagination.populate = ['unidade', 'parent'];
        this.setorDestinoPagination.filter = {parent: 'isNotNull'};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            processo => this.processo = processo
        );

        this.tramitacao$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            tramitacao => this.tramitacao = tramitacao
        );

        if (!this.tramitacao) {
            this.tramitacao = new Tramitacao();
            this.tramitacao.processo = this.processo;
            this.tramitacao.setorOrigem = this.processo.setorAtual;
        }
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

    submit(values): void {

        const tramitacao = new Tramitacao();

        Object.entries(values).forEach(
            ([key, value]) => {
                tramitacao[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveTramitacao({tramitacao: tramitacao, operacaoId: operacaoId}));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
