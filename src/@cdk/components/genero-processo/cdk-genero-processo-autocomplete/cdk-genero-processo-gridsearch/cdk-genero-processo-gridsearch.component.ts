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

import {GeneroProcessoService} from '@cdk/services/genero-processo.service';
import {GeneroProcesso} from '@cdk/models/genero-processo.model';

@Component({
    selector: 'cdk-genero-processo-gridsearch',
    templateUrl: './cdk-genero-processo-gridsearch.component.html',
    styleUrls: ['./cdk-genero-processo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGeneroProcessoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    generoProcessos: GeneroProcesso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _generoProcessoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoProcessoService: GeneroProcessoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._generoProcessoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.generoProcessos = response['entities'];
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

    select(generoProcesso): void {
        this.selected.emit(generoProcesso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
