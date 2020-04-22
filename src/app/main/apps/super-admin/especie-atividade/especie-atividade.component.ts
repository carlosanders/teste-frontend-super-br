import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'especie-atividade',
    templateUrl: './especie-atividade.component.html',
    styleUrls: ['./especie-atividade.component.scss']
})
export class EspecieAtividadeComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    action = '';
    routerState: any;

    constructor(
        private _store: Store<fromStore.State>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('tipo-documento-list') > -1) {
                    this.action = 'tipo-documento-list';
                }
                if (this.routerState.url.indexOf('editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/'), 'listar')]).then();
        }
        if (this.action === 'tipo-documento-list') {
            this._router.navigate([this.routerState.url.replace(('tipo-documento-list/'), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
    }

}
