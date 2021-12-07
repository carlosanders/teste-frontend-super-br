import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getRouterState} from '../../../../../store';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'classificacao-visibilidades',
    templateUrl: './visibilidades.component.html',
    styleUrls: ['./visibilidades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VisibilidadesComponent implements OnInit, OnDestroy {

    action = '';
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(private _store: Store<fromStore.State>,
                private _changeDetectorRef: ChangeDetectorRef,
                private _router: Router) {
    }

    ngOnInit(): void
    {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.url.indexOf('acessos/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('acessos/editar/criar') > -1) {
                this.action = 'criar';
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    goBack(): void
    {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/'), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('criar', 'listar')]).then();
        }
    }
}
