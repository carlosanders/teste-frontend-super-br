import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {VisualizarProcessoComponent} from '../../visualizar-processo.component';
import {VisualizarProcessoService} from '../../visualizar-processo.service';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {VisualizarProcessoAppState} from '../reducers';
import {getRouterState} from '../../../../../../store';
import {filter} from 'rxjs/operators';
import {getProcessoLoaded} from '../../store';

@Injectable()
export class DeactivateGuard implements CanDeactivate<VisualizarProcessoComponent> {
    routerState: any;
    processoId: number = null;

    /**
     *
     * @param _store
     * @param _visualizarProcessoService
     */
    constructor(
        private _store: Store<VisualizarProcessoAppState>,
        private _visualizarProcessoService: VisualizarProcessoService
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

    canDeactivate(target: VisualizarProcessoComponent): Observable<boolean> {
        if (!this.routerState.url.includes('visualizar-processo/' + this.processoId)) {
            this._visualizarProcessoService.guardaAtivado.next(false);
        }
        return of(true);
    }
}
