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

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {Compartilhamento} from '@cdk/models/compartilhamento.model';

@Component({
    selector: 'cdk-compartilhamento-gridsearch',
    templateUrl: './cdk-compartilhamento-gridsearch.component.html',
    styleUrls: ['./cdk-compartilhamento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkCompartilhamentoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    compartilhamentos: Compartilhamento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _compartilhamentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _compartilhamentoService: CompartilhamentoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._compartilhamentoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.compartilhamentos = response['entities'];
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

    select(compartilhamento): void {
        this.selected.emit(compartilhamento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
