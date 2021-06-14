import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {catchError, finalize} from 'rxjs/operators';

import {ModalidadeAlvoInibidor, Pagination} from '@cdk/models';

import {ModalidadeAlvoInibidorService} from '@cdk/services/modalidade-alvo-inibidor.service';

@Component({
    selector: 'cdk-modalidade-alvo-inibidor-gridsearch',
    templateUrl: './cdk-modalidade-alvo-inibidor-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-alvo-inibidor-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeAlvoInibidorGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadealvoInibidors: ModalidadeAlvoInibidor[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadealvoInibidorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeAlvoInibidorService: ModalidadeAlvoInibidorService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeAlvoInibidorService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidadealvoInibidors = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        };
        this.load (params);
    }

    select(modalidadealvoInibidor): void {
        this.selected.emit(modalidadealvoInibidor);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
