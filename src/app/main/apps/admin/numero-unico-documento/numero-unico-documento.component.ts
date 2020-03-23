import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Setor} from '@cdk/models';

@Component({
    selector: 'numero-unico-documento',
    templateUrl: './numero-unico-documento.component.html',
    styleUrls: ['./numero-unico-documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class NumeroUnicoDocumentoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    setor$: Observable<Setor>;

    action = '';
    routerState: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.NumeroUnicoDocumentoState>,
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
                if (this.routerState.url.indexOf('numeros-unicos-documentos/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('numeros-unicos-documentos/editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('numeros-unicos-documentos/editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getTitulo(): string {
        if (this.action === 'listar') {
            return 'Números Únicos de Documentos';
        } else if (this.action === 'criar') {
            return 'Novo Número Único de Documento';
        } else if (this.action === 'editar') {
            return 'Alterar Número Único de Documento';
        }
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.numeroUnicoDocumentoHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
    }
}
