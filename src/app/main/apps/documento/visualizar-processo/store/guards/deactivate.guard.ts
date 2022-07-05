import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {VisualizarProcessoComponent} from '../../anexar-copia.component';
import {VisualizarProcessoService} from '../../anexar-copia.service';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AnexarCopiaAppState} from '../reducers';
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
     * @param _anexarCopiaService
     */
    constructor(
        private _store: Store<AnexarCopiaAppState>,
        private _anexarCopiaService: VisualizarProcessoService
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
        if (!this.routerState.url.includes('anexar-copia/' + this.processoId)) {
            this._anexarCopiaService.guardaAtivado.next(false);
        }
        return of(true);
    }
}
