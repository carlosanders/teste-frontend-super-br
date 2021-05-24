import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStoreComponente from '../../componente-digital/store';
import {ComponenteDigital, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState, State} from 'app/store/reducers';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Component({
    selector: 'documento-avulso-edit-versoes',
    templateUrl: './documento-avulso-edit-versoes.component.html',
    styleUrls: ['./documento-avulso-edit-versoes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoEditVersoesComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    loading$: Observable<boolean>;
    logEntryPagination: Pagination;
    componenteDigital$: Observable<ComponenteDigital>;
    componenteDigital: ComponenteDigital;

    editor: any;

    error$: Observable<any>;
    erro: any;

    routerState: any;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _componenteDigitalService
     */
    constructor(
        private _store: Store<State>,
        private _location: Location,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStoreComponente.getComponenteDigital));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.componenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((cd) => {
            this.componenteDigital = cd;

            if (this.componenteDigital) {
                this.logEntryPagination = new Pagination();
                this.logEntryPagination.filter = {
                    entity: 'SuppCore\\AdministrativoBackend\\Entity\\ComponenteDigital',
                    target: 'hash',
                    id: + this.componenteDigital.id};
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * @param data
     */
    doReverter(data: any): void {
        this._store.dispatch(new fromStoreComponente.RevertComponenteDigital({componenteDigital: this.componenteDigital, hash: data.toString() }));
    }

    /**
     * @param data
     */
    doVisualizar(data: any): void {
        this._store.dispatch(new fromStoreComponente.VisualizarVersaoComponenteDigital(data.toString()));
    }

    /**
     * @param data
     */
    doComparar(data: any): void {
        this._store.dispatch(new fromStoreComponente.CompararVersaoComponenteDigital(data.toString()));
    }
}
