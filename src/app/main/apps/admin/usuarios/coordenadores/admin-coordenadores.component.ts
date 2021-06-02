import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Usuario} from '@cdk/models';
import {cdkAnimations} from '@cdk/animations';
import {Back} from 'app/store/actions';

@Component({
    selector: 'admin-coordenadores',
    templateUrl: './admin-coordenadores.component.html',
    styleUrls: ['./admin-coordenadores.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AdminCoordenadoresComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    usuario$: Observable<Usuario>;

    action = '';
    routerState: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.CoordenadoresState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
                this._changeDetectorRef.markForCheck();
            }
        });

        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        this._store.dispatch(new Back());
    }
}
