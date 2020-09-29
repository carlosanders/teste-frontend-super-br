import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Pagination, Processo, Transicao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getOperacoesState, getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '../../../../../@cdk/animations';


@Component({
    selector: 'realizar-transicao',
    templateUrl: './realizar-transicao.component.html',
    styleUrls: ['./realizar-transicao.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RealizarTransicaoComponent implements OnInit {


    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processos: Processo[] = [];
    processos$: Observable<Processo[]>;
    public processoId: number;
    operacoes: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject();
    modalidadeTransicaoPagination: Pagination;
    transicao: Transicao;
    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.RealizarTransicaoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
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

        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe(processos => {
            this.processos = processos;
        });
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
