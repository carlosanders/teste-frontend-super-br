import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import {Back, getRouterState} from '../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
    selector: 'modelos',
    templateUrl: './modelos.component.html',
    styleUrls: ['./modelos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosComponent implements OnInit, OnDestroy {
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(private _store: Store, private _router: Router) {}

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        this._store.dispatch(new Back());
    }
}
