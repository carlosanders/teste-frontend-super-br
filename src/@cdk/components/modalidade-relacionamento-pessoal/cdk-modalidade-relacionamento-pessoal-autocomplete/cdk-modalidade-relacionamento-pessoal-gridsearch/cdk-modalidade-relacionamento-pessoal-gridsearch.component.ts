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

import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';
import {ModalidadeRelacionamentoPessoal} from '@cdk/models/modalidade-relacionamento-pessoal.model';

@Component({
    selector: 'cdk-modalidade-relacionamento-pessoal-gridsearch',
    templateUrl: './cdk-modalidade-relacionamento-pessoal-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-relacionamento-pessoal-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeRelacionamentoPessoalGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidaderelacionamentoPessoals: ModalidadeRelacionamentoPessoal[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidaderelacionamentoPessoalService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeRelacionamentoPessoalService: ModalidadeRelacionamentoPessoalService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeRelacionamentoPessoalService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidaderelacionamentoPessoals = response['entities'];
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

    select(modalidaderelacionamentoPessoal): void {
        this.selected.emit(modalidaderelacionamentoPessoal);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
