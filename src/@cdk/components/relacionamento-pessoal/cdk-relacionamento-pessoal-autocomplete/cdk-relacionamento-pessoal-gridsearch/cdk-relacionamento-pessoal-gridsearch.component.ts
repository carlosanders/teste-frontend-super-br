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

import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';

@Component({
    selector: 'cdk-relacionamento-pessoal-gridsearch',
    templateUrl: './cdk-relacionamento-pessoal-gridsearch.component.html',
    styleUrls: ['./cdk-relacionamento-pessoal-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkRelacionamentoPessoalGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    relacionamentoPessoals: RelacionamentoPessoal[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _relacionamentoPessoalService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _relacionamentoPessoalService: RelacionamentoPessoalService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._relacionamentoPessoalService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.relacionamentoPessoals = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

    reload(params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load(params);
    }

    select(relacionamentoPessoal): void {
        this.selected.emit(relacionamentoPessoal);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
