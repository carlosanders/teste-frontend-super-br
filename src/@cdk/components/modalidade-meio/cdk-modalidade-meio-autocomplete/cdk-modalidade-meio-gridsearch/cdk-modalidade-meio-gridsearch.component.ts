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

import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';
import {ModalidadeMeio} from '@cdk/models/modalidade-meio.model';

@Component({
    selector: 'cdk-modalidade-meio-gridsearch',
    templateUrl: './cdk-modalidade-meio-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-meio-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeMeioGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidademeios: ModalidadeMeio[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidademeioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeMeioService: ModalidadeMeioService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeMeioService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidademeios = response['entities'];
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

    select(modalidademeio): void {
        this.selected.emit(modalidademeio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
