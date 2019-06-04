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

import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {VinculacaoProcesso} from '@cdk/models/vinculacao-processo.model';

@Component({
    selector: 'cdk-vinculacao-processo-gridsearch',
    templateUrl: './cdk-vinculacao-processo-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-processo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoProcessoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacaoProcessos: VinculacaoProcesso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoProcessoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoProcessoService: VinculacaoProcessoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._vinculacaoProcessoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.vinculacaoProcessos = response['entities'];
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

    select(vinculacaoProcesso): void {
        this.selected.emit(vinculacaoProcesso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
