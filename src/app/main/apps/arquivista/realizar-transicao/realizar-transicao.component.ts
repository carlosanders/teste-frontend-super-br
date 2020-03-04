import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pagination, Processo, Transicao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';

@Component({
    selector: 'app-realizar-transicao',
    templateUrl: './realizar-transicao.component.html',
    styleUrls: ['./realizar-transicao.component.scss']
})
export class RealizarTransicaoComponent implements OnInit {


    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;
    public processoId: number;

    modalidadeTransicaoPagination: Pagination;

    private transicao$: Observable<Transicao>;
    transicao: Transicao;
    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.RealizarTransicaoAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modalidadeTransicaoPagination = new Pagination();
    }

    ngOnInit(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.processoId = this.routerState.params.processoHandle;
    }

    submit(values): void {
        const transicao = new Transicao();

        Object.entries(values).forEach(
            ([key, value]) => {
                transicao[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveTransicao(transicao));

    }
}
