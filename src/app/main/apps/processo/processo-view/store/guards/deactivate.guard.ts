import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {ProcessoViewComponent} from '../../processo-view.component';
import {ProcessoViewService} from '../../processo-view.service';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ProcessoViewAppState} from '../reducers';
import {getRouterState} from '../../../../../../store';
import {filter} from 'rxjs/operators';
import {getProcessoLoaded} from '../../../store';

@Injectable()
export class DeactivateGuard implements CanDeactivate<ProcessoViewComponent> {
    routerState: any;
    processoId: number = null;

    /**
     *
     * @param _store
     * @param _processoViewService
     */
    constructor(
        private _store: Store<ProcessoViewAppState>,
        private _processoViewService: ProcessoViewService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this._store.pipe(
            select(getProcessoLoaded)
        ).subscribe((loaded) => {
            this.processoId = loaded.value;
        });
    }

    canDeactivate(target: ProcessoViewComponent): Observable<boolean> {
        if (!this.routerState.url.includes('/processo/' + this.processoId + '/visualizar') || this.routerState.url.includes('/processo/' + this.processoId + '/visualizar/latest')) {
            this._processoViewService.guardaAtivado.next(false);
        }
        return of(true);
    }
}
