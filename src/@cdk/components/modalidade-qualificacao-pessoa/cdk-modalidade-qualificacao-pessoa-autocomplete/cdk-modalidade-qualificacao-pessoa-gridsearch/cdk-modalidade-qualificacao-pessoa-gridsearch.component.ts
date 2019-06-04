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

import {ModalidadeQualificacaoPessoaService} from '@cdk/services/modalidade-qualificacao-pessoa.service';
import {ModalidadeQualificacaoPessoa} from '@cdk/models/modalidade-qualificacao-pessoa.model';

@Component({
    selector: 'cdk-modalidade-qualificacao-pessoa-gridsearch',
    templateUrl: './cdk-modalidade-qualificacao-pessoa-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-qualificacao-pessoa-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeQualificacaoPessoaGridsearchComponent {

    @Input()
    filter = {};

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
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeQualificacaoPessoaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadequalificacaoPessoas = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload (params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
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
