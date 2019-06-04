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

import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {GeneroDocumentoAvulso} from '@cdk/models/genero-documento-avulso.model';

@Component({
    selector: 'cdk-genero-documento-avulso-gridsearch',
    templateUrl: './cdk-genero-documento-avulso-gridsearch.component.html',
    styleUrls: ['./cdk-genero-documento-avulso-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGeneroDocumentoAvulsoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    generoDocumentoAvulsos: GeneroDocumentoAvulso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _generoDocumentoAvulsoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoDocumentoAvulsoService: GeneroDocumentoAvulsoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._generoDocumentoAvulsoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.generoDocumentoAvulsos = response['entities'];
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

    select(generoDocumentoAvulso): void {
        this.selected.emit(generoDocumentoAvulso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
