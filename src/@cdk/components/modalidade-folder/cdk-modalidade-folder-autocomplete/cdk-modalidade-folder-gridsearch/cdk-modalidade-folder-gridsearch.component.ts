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

import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';
import {ModalidadeFolder} from '@cdk/models/modalidade-folder.model';

@Component({
    selector: 'cdk-modalidade-folder-gridsearch',
    templateUrl: './cdk-modalidade-folder-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-folder-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeFolderGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadefolders: ModalidadeFolder[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadefolderService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeFolderService: ModalidadeFolderService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeFolderService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadefolders = response['entities'];
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

    select(modalidadefolder): void {
        this.selected.emit(modalidadefolder);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
