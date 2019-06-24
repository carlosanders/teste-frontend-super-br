import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Visibilidade} from '@cdk/models/visibilidade.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models/processo.model';
import {getProcesso} from '../../../store/selectors';

@Component({
    selector: 'visibilidade-edit',
    templateUrl: './visibilidade-edit.component.html',
    styleUrls: ['./visibilidade-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VisibilidadeEditComponent implements OnInit, OnDestroy {

    visibilidade$: Observable<Visibilidade>;
    visibilidade: Visibilidade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.VisibilidadeEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.visibilidade$ = this._store.pipe(select(fromStore.getVisibilidade));
        this.processo$ = this._store.pipe(select(getProcesso));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this.visibilidade$.subscribe(
            visibilidade => this.visibilidade = visibilidade
        );

        if (!this.visibilidade) {
            this.visibilidade = new Visibilidade();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(visibilidade): void {

        this._store.dispatch(new fromStore.SaveVisibilidade({processoId: this.processo.id, visibilidade: visibilidade}));

    }

}
