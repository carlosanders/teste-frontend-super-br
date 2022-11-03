import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import {getRouterState, RouterStateUrl} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'representantes',
    templateUrl: './representantes.component.html',
    styleUrls: ['./representantes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepresentantesComponent implements OnInit {

    action = '';
    routerState: RouterStateUrl;

    constructor(
        private _store: Store,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.url.indexOf('representantes/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('representantes/editar') > -1) {
                this.action = 'editar';
            }
            if (this.routerState.url.indexOf('representantes/criar') > -1) {
                this.action = 'criar';
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.representanteHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('criar', 'listar')]).then();
        }
    }
}
