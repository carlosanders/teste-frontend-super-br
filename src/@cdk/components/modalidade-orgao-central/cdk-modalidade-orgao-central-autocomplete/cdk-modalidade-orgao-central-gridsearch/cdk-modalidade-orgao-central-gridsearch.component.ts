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

import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {ModalidadeOrgaoCentral} from '@cdk/models/modalidade-orgao-central.model';

@Component({
    selector: 'cdk-modalidade-orgao-central-gridsearch',
    templateUrl: './cdk-modalidade-orgao-central-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-orgao-central-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeOrgaoCentralGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadeorgaoCentrals: ModalidadeOrgaoCentral[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadeorgaoCentralService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeOrgaoCentralService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadeorgaoCentrals = response['entities'];
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

    select(modalidadeorgaoCentral): void {
        this.selected.emit(modalidadeorgaoCentral);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
