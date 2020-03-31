import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Pagination, Processo, Transicao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getOperacoesState, getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {filter, takeUntil} from 'rxjs/operators';


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
    operacoes: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject();

    modalidadeTransicaoPagination: Pagination;

    private transicao$: Observable<Transicao>;
    transicao: Transicao;
    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.RealizarTransicaoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modalidadeTransicaoPagination = new Pagination();
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'realizar-transicao')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );
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
        this._store.dispatch(new fromStore.SaveRealizarTransicao(transicao));

    }
}
