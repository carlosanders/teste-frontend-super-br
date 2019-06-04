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

import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {ModalidadeDestinacao} from '@cdk/models/modalidade-destinacao.model';

@Component({
    selector: 'cdk-modalidade-destinacao-gridsearch',
    templateUrl: './cdk-modalidade-destinacao-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-destinacao-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeDestinacaoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadedestinacoes: ModalidadeDestinacao[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadedestinacaoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeDestinacaoService: ModalidadeDestinacaoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeDestinacaoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadedestinacoes = response['entities'];
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

    select(modalidadedestinacao): void {
        this.selected.emit(modalidadedestinacao);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
