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

import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {VinculacaoDocumento} from '@cdk/models/vinculacao-documento.model';

@Component({
    selector: 'cdk-vinculacao-documento-gridsearch',
    templateUrl: './cdk-vinculacao-documento-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-documento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoDocumentoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacaoDocumentos: VinculacaoDocumento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoDocumentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._vinculacaoDocumentoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.vinculacaoDocumentos = response['entities'];
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

    select(vinculacaoDocumento): void {
        this.selected.emit(vinculacaoDocumento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
