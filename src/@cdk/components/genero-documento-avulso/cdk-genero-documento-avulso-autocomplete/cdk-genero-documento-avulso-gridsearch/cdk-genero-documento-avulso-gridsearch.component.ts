import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models/pagination';

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
export class CdkGeneroDocumentoAvulsoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

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
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._generoDocumentoAvulsoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.generoDocumentoAvulsos = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

   reload (params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        };
        this.load (params);
    }

    select(generoDocumentoAvulso): void {
        this.selected.emit(generoDocumentoAvulso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
