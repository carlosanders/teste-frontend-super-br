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

import {ModalidadeGeneroPessoaService} from '@cdk/services/modalidade-genero-pessoa.service';
import {ModalidadeGeneroPessoa} from '@cdk/models/modalidade-genero-pessoa.model';

@Component({
    selector: 'cdk-modalidade-genero-pessoa-gridsearch',
    templateUrl: './cdk-modalidade-genero-pessoa-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-genero-pessoa-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeGeneroPessoaGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadegeneroPessoas: ModalidadeGeneroPessoa[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadegeneroPessoaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeGeneroPessoaService: ModalidadeGeneroPessoaService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeGeneroPessoaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadegeneroPessoas = response['entities'];
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

    select(modalidadegeneroPessoa): void {
        this.selected.emit(modalidadegeneroPessoa);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
