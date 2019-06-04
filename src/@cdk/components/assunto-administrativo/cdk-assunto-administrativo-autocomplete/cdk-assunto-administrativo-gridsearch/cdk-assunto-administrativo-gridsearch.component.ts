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

import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {AssuntoAdministrativo} from '@cdk/models/assunto-administrativo.model';

@Component({
    selector: 'cdk-assunto-administrativo-gridsearch',
    templateUrl: './cdk-assunto-administrativo-gridsearch.component.html',
    styleUrls: ['./cdk-assunto-administrativo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAssuntoAdministrativoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    assuntosAdministrativos: AssuntoAdministrativo[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _assuntoAdministrativoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _assuntoAdministrativoService: AssuntoAdministrativoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._assuntoAdministrativoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.assuntosAdministrativos = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload (params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load (params);
    }

    select(assuntoAdministrativo): void {
        this.selected.emit(assuntoAdministrativo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
