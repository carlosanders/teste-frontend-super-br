import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {VinculacaoProcesso} from '@cdk/models/vinculacao-processo.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models/processo.model';
import {getProcesso} from '../../../store/selectors';

@Component({
    selector: 'vinculacao-processo-edit',
    templateUrl: './vinculacao-processo-edit.component.html',
    styleUrls: ['./vinculacao-processo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VinculacaoProcessoEditComponent implements OnInit, OnDestroy {

    vinculacaoProcesso$: Observable<VinculacaoProcesso>;
    vinculacaoProcesso: VinculacaoProcesso;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.VinculacaoProcessoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoProcesso$ = this._store.pipe(select(fromStore.getVinculacaoProcesso));
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

        this.vinculacaoProcesso$.subscribe(
            vinculacaoProcesso => this.vinculacaoProcesso = vinculacaoProcesso
        );

        if (!this.vinculacaoProcesso) {
            this.vinculacaoProcesso = new VinculacaoProcesso();
            this.vinculacaoProcesso.processo = this.processo;
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

    submit(values): void {

        const vinculacaoProcesso = new VinculacaoProcesso();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoProcesso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveVinculacaoProcesso(vinculacaoProcesso));

    }

}
