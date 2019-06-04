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

import {ModalidadeAfastamentoService} from '@cdk/services/modalidade-afastamento.service';
import {ModalidadeAfastamento} from '@cdk/models/modalidade-afastamento.model';

@Component({
    selector: 'cdk-modalidade-afastamento-gridsearch',
    templateUrl: './cdk-modalidade-afastamento-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-afastamento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeAfastamentoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadeafastamentos: ModalidadeAfastamento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadeafastamentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeAfastamentoService: ModalidadeAfastamentoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeAfastamentoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadeafastamentos = response['entities'];
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

    select(modalidadeafastamento): void {
        this.selected.emit(modalidadeafastamento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
