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

import {GeneroDocumentoService} from '@cdk/services/genero-documento.service';
import {GeneroDocumento} from '@cdk/models/genero-documento.model';

@Component({
    selector: 'cdk-genero-documento-gridsearch',
    templateUrl: './cdk-genero-documento-gridsearch.component.html',
    styleUrls: ['./cdk-genero-documento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGeneroDocumentoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    generoDocumentos: GeneroDocumento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _generoDocumentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoDocumentoService: GeneroDocumentoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._generoDocumentoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.generoDocumentos = response['entities'];
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

    select(generoDocumento): void {
        this.selected.emit(generoDocumento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
