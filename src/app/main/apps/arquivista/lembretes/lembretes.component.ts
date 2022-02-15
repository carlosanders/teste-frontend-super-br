import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {LembreteService} from '@cdk/services/lembrete.service';
import {Observable, Subject} from 'rxjs';
import {Lembrete, Pagination, Processo} from '@cdk/models';
import {getRouterState, RouterStateUrl} from '../../../../store';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'lembretes',
    templateUrl: './lembretes.component.html',
    styleUrls: ['./lembretes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class LembretesComponent implements OnInit, OnDestroy {

    loading: boolean;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    lembretes$: Observable<Lembrete>;
    lembretes: Lembrete;
    total = 0;
    processoId: number;
    processos: Processo[] = [];
    processos$: Observable<Processo[]>;

    lembretesPagination: Pagination;

    logEntryPagination: Pagination;

    private routerState: RouterStateUrl;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _lembreteService: LembreteService,
        private _store: Store<fromStore.LembreteAppState>
    ) {
        this.loading = false;
        this.initObservables();
        this.initRouteState();
        this.setProcessoId();
        this.lembretesPagination = new Pagination();
        this.lembretesPagination.filter = {};
        this.lembretesPagination.filter = {
            'processo.id': 'eq:' + this.processoId
        };
        this.lembretesPagination.sort = {
            'criadoEm': 'DESC'
        };
    }

    ngOnInit(): void {
        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe((processos) => {
            this.processos = processos;
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    initObservables(): void {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
        this.lembretes$ = this._store.pipe(select(fromStore.getLembreteList));
    }

    initRouteState(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    doReload(params): void {
        this._store.dispatch(new fromStore.GetLembrete({
            ...this.lembretesPagination,
            filter: {
                ...this.lembretesPagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.lembretesPagination.populate
            ]
        }));
    }

    setProcessoId(): void {
        this.processoId = this.routerState.params.processoHandle;
    }

    submit(values): void {
        const lembrete = new Lembrete();

        Object.entries(values).forEach(
            ([key, value]) => {
                lembrete[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveLembrete({
            lembrete: lembrete,
            operacaoId: operacaoId
        }));
    }
}
