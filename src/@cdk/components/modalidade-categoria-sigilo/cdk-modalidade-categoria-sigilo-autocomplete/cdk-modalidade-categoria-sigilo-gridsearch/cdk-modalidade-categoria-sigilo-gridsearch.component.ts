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

import {ModalidadeCategoriaSigiloService} from '@cdk/services/modalidade-categoria-sigilo.service';
import {ModalidadeCategoriaSigilo} from '@cdk/models/modalidade-categoria-sigilo.model';

@Component({
    selector: 'cdk-modalidade-categoria-sigilo-gridsearch',
    templateUrl: './cdk-modalidade-categoria-sigilo-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-categoria-sigilo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeCategoriaSigiloGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadecategoriaSigilos: ModalidadeCategoriaSigilo[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadecategoriaSigiloService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeCategoriaSigiloService: ModalidadeCategoriaSigiloService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeCategoriaSigiloService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadecategoriaSigilos = response['entities'];
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

    select(modalidadecategoriaSigilo): void {
        this.selected.emit(modalidadecategoriaSigilo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
