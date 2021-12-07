import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Processo, Volume} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

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
    private _unsubscribeAll: Subject<any> = new Subject<any>();

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => this.processo = processo);

        this.volume$.pipe(
            filter(volume => !!volume),
            takeUntil(this._unsubscribeAll)
        ).subscribe(volume => this.volume = volume);

        if (!this.volume) {
            this.volume = new Volume();
            this.volume.processo = this.processo;
        }

        this.logEntryPagination.filter = {
            entity: 'SuppCore\\AdministrativoBackend\\Entity\\Volume',
            id: +this.volume.id
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadStore());
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

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVolume({volume: volume, operacaoId: operacaoId}));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
