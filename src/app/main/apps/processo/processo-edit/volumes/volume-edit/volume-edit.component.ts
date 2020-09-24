import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Volume} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models';
import {Back} from '../../../../../../store/actions';

@Component({
    selector: 'volume-edit',
    templateUrl: './volume-edit.component.html',
    styleUrls: ['./volume-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VolumeEditComponent implements OnInit, OnDestroy {

    volume$: Observable<Volume>;
    volume: Volume;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    modalidadeMeioPagination: Pagination;
    logEntryPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.VolumeEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.volume$ = this._store.pipe(select(fromStore.getVolume));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.modalidadeMeioPagination = new Pagination();
        this.logEntryPagination = new Pagination();
        // this.modalidadeMeioPagination.populate = ['parent'];
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

        this.volume$.subscribe(
            volume => this.volume = volume
        );

        if (!this.volume) {
            this.volume = new Volume();
            this.volume.processo = this.processo;
        }

        this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Volume', id: + this.volume.id};
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

        const volume = new Volume();

        Object.entries(values).forEach(
            ([key, value]) => {
                volume[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveVolume(volume));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
