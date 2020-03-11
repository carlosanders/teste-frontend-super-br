import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LembreteService} from '../../../../../@cdk/services/lembrete.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Lembrete, Pagination} from '../../../../../@cdk/models';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';

@Component({
    selector: 'app-lembretes-form',
    templateUrl: './lembretes.component.html',
    styleUrls: ['./lembretes.component.scss']
})
export class LembretesComponent implements OnInit {


    pagination: Pagination;
    loading: boolean;
    lembretes: Lembrete[];
    total = 0;
    processo: number;
    private routerState: RouterStateUrl;
    private isSaving$: Observable<boolean>;
    private errors$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _lembreteService: LembreteService,
        private _store: Store<fromStore.LembreteAppState>
    ) {
        this.loading = false;
        this.pagination = new Pagination();
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

    }

    ngOnInit(): void {
        this.load(this.pagination);
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.processo = this.routerState.params.processoHandle;
    }

    load(params): void {

        this.loading = true;

        this._lembreteService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.lembretes = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

    reload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        };
        this.load (params);
    }

    submit(values): void {
        const lembrete = new Lembrete();

        Object.entries(values).forEach(
            ([key, value]) => {
                lembrete[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveLembrete(lembrete));

    }

}
