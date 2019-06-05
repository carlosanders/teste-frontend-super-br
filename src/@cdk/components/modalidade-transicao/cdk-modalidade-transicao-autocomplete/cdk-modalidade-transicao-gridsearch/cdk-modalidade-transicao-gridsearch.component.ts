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

import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {ModalidadeTransicao} from '@cdk/models/modalidade-transicao.model';

@Component({
    selector: 'cdk-modalidade-transicao-gridsearch',
    templateUrl: './cdk-modalidade-transicao-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-transicao-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeTransicaoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadetransicoes: ModalidadeTransicao[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadetransicaoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeTransicaoService: ModalidadeTransicaoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeTransicaoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadetransicoes = response['entities'];
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

    select(modalidadetransicao): void {
        this.selected.emit(modalidadetransicao);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
