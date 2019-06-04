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

import {FolderService} from '@cdk/services/folder.service';
import {Folder} from '@cdk/models/folder.model';

@Component({
    selector: 'cdk-folder-gridsearch',
    templateUrl: './cdk-folder-gridsearch.component.html',
    styleUrls: ['./cdk-folder-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkFolderGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    folders: Folder[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _folderService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _folderService: FolderService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._folderService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.folders = response['entities'];
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

    select(folder): void {
        this.selected.emit(folder);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
