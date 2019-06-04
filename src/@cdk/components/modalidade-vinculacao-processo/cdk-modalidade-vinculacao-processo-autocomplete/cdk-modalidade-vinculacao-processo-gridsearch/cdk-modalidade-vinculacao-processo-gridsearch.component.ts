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

import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {ModalidadeVinculacaoProcesso} from '@cdk/models/modalidade-vinculacao-processo.model';

@Component({
    selector: 'cdk-modalidade-vinculacao-processo-gridsearch',
    templateUrl: './cdk-modalidade-vinculacao-processo-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-processo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeVinculacaoProcessoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadevinculacaoProcessos: ModalidadeVinculacaoProcesso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadevinculacaoProcessoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeVinculacaoProcessoService: ModalidadeVinculacaoProcessoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeVinculacaoProcessoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadevinculacaoProcessos = response['entities'];
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

    select(modalidadevinculacaoProcesso): void {
        this.selected.emit(modalidadevinculacaoProcesso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
