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

import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {ModalidadeColaborador} from '@cdk/models/modalidade-colaborador.model';

@Component({
    selector: 'cdk-modalidade-colaborador-gridsearch',
    templateUrl: './cdk-modalidade-colaborador-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-colaborador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeColaboradorGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadecolaboradors: ModalidadeColaborador[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadecolaboradorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeColaboradorService: ModalidadeColaboradorService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeColaboradorService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadecolaboradors = response['entities'];
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

    select(modalidadecolaborador): void {
        this.selected.emit(modalidadecolaborador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
