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

import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {VinculacaoRepositorio} from '@cdk/models/vinculacao-repositorio.model';

@Component({
    selector: 'cdk-vinculacao-repositorio-gridsearch',
    templateUrl: './cdk-vinculacao-repositorio-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-repositorio-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoRepositorioGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacaoRepositorios: VinculacaoRepositorio[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoRepositorioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoRepositorioService: VinculacaoRepositorioService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._vinculacaoRepositorioService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.vinculacaoRepositorios = response['entities'];
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

    select(vinculacaoRepositorio): void {
        this.selected.emit(vinculacaoRepositorio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
