import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Acao} from '@cdk/models/acao.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'acao-list',
    templateUrl: './acao-list.component.html',
    styleUrls: ['./acao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcaoListComponent implements OnInit {

    routerState: any;
    acoes$: Observable<Acao[]>;
    acoes: Acao[] = [];
    loading$: Observable<boolean>;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.AcaoListAppState>,
    ) {
        this.acoes$ = this._store.pipe(select(fromStore.getAcaoList));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.acoes$.pipe(
            filter(acoes => !!acoes)
        ).subscribe(
            acoes => this.acoes = acoes
        );
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetAcoes(params));
    }

    delete(acaoId: number): void {
        this._store.dispatch(new fromStore.DeleteAcao(acaoId));
    }

}