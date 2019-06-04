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

import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {ModalidadeInteressado} from '@cdk/models/modalidade-interessado.model';

@Component({
    selector: 'cdk-modalidade-interessado-gridsearch',
    templateUrl: './cdk-modalidade-interessado-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-interessado-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeInteressadoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadeinteressados: ModalidadeInteressado[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadeinteressadoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeInteressadoService: ModalidadeInteressadoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeInteressadoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadeinteressados = response['entities'];
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

    select(modalidadeinteressado): void {
        this.selected.emit(modalidadeinteressado);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
