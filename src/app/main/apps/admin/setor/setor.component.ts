import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'admin-setor',
    templateUrl: './setor.component.html',
    styleUrls: ['./setor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SetorComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    action = '';
    routerState: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.State>,
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
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('setor/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('setor/editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('setor/editar/criar') > -1) {
                    this.action = 'criar';
                }
                if (this.routerState.url.indexOf('lotacoes') > -1) {
                    this.action = 'lotacoes';
                }
                if (this.routerState.url.indexOf('localizadores') > -1) {
                    this.action = 'localizadores';
                }
                if (this.routerState.url.indexOf('numeros-unicos-documentos') > -1) {
                    this.action = 'numeros-unicos-documentos';
                }
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.setorHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
        if (this.action === 'lotacoes' || this.action === 'localizadores' || this.action === 'numeros-unicos-documentos') {
            this._router.navigate([`apps/admin/${this.routerState.params.unidadeHandle}/setor/listar`]).then();
        }
    }
}
