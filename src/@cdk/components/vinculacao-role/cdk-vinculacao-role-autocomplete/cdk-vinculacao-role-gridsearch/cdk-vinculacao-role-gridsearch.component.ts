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

import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {VinculacaoRole} from '@cdk/models/vinculacao-role.model';

@Component({
    selector: 'cdk-vinculacao-role-gridsearch',
    templateUrl: './cdk-vinculacao-role-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-role-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoRoleGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacaoRoles: VinculacaoRole[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoRoleService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoRoleService: VinculacaoRoleService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._vinculacaoRoleService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.vinculacaoRoles = response['entities'];
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

    select(vinculacaoRole): void {
        this.selected.emit(vinculacaoRole);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
