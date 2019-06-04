import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation, EventEmitter
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {TipoSigilo} from '@cdk/models/tipo-sigilo.model';

@Component({
    selector: 'cdk-tipo-sigilo-gridsearch',
    templateUrl: './cdk-tipo-sigilo-gridsearch.component.html',
    styleUrls: ['./cdk-tipo-sigilo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkTipoSigiloGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    tipoSigilos: TipoSigilo[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _tipoSigiloService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoSigiloService: TipoSigiloService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._tipoSigiloService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.tipoSigilos = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

    reload(params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load(params);
    }

    select(tipoSigilo): void {
        this.selected.emit(tipoSigilo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
