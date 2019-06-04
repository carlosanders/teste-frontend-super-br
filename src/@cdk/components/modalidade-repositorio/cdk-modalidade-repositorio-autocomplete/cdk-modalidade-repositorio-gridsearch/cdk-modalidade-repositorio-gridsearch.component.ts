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

import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import {ModalidadeRepositorio} from '@cdk/models/modalidade-repositorio.model';

@Component({
    selector: 'cdk-modalidade-repositorio-gridsearch',
    templateUrl: './cdk-modalidade-repositorio-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-repositorio-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeRepositorioGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidaderepositorios: ModalidadeRepositorio[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidaderepositorioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeRepositorioService: ModalidadeRepositorioService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeRepositorioService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidaderepositorios = response['entities'];
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

    select(modalidaderepositorio): void {
        this.selected.emit(modalidaderepositorio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
