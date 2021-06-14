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

import {ModalidadeQualificacaoPessoa, Pagination} from '@cdk/models';

import {ModalidadeQualificacaoPessoaService} from '@cdk/services/modalidade-qualificacao-pessoa.service';

@Component({
    selector: 'cdk-modalidade-qualificacao-pessoa-gridsearch',
    templateUrl: './cdk-modalidade-qualificacao-pessoa-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-qualificacao-pessoa-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeQualificacaoPessoaGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadequalificacaoPessoas: ModalidadeQualificacaoPessoa[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadequalificacaoPessoaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeQualificacaoPessoaService: ModalidadeQualificacaoPessoaService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeQualificacaoPessoaService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidadequalificacaoPessoas = response['entities'];
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

    select(modalidadequalificacaoPessoa): void {
        this.selected.emit(modalidadequalificacaoPessoa);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
