import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Cronjob} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store';
import {cdkAnimations} from '@cdk/animations';
import {filter, takeUntil} from 'rxjs/operators';
import {MercureService} from '@cdk/services/mercure.service';

@Component({
    selector: 'cronjob-list',
    templateUrl: './cronjob-list.component.html',
    styleUrls: ['./cronjob-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CronjobListComponent implements OnInit, OnDestroy {

    routerState: any;
    cronjobs: Cronjob[] = [];
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    executingIds$: Observable<number[]>;

    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.CronjobListAppState>,
        private _mercureService: MercureService
    ) {
        this._store.pipe(select(fromStore.getCronjobList))
            .subscribe((cronjobs: Cronjob[]) => {
                const mercureSubscribed = [];
                this.cronjobs.forEach((cronjob) => {
                    if (mercureSubscribed.indexOf(cronjob['@id']) === -1) {
                        mercureSubscribed.push(cronjob['@id']);
                    }
                });
                const mercureUnsubscribed = [];
                this.cronjobs.forEach((cronjob) => {
                    if (mercureSubscribed.indexOf(cronjob['@id']) === -1) {
                        mercureUnsubscribed.push(cronjob['@id']);
                    }
                });
                this._mercureService.unsubscribe(mercureUnsubscribed);
                this._mercureService.subscribe(mercureSubscribed);
                this.cronjobs = cronjobs;

                this._changeDetectorRef.markForCheck();
            });

        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.executingIds$ = this._store.pipe(select(fromStore.getExecutingIds));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadCronjob());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }


    /**
     *
     * colaborador.lotacoes.setor.id: eq:1
     *
     * nome: like:eduardo
     *
     */

    reload(params): void {
        this._store.dispatch(new fromStore.GetCronjob({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context
        }));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetCronjob({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context,
        }));
    }

    edit(cronjobId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + cronjobId]).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    executeCronJob(cronjobId: number): void {
        this._store.dispatch(new fromStore.ExecuteCronjob(cronjobId));
    }
}
