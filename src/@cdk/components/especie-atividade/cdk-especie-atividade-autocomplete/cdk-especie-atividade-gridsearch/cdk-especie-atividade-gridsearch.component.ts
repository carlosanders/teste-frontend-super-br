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

import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {EspecieAtividade} from '@cdk/models/especie-atividade.model';

@Component({
    selector: 'cdk-especie-atividade-gridsearch',
    templateUrl: './cdk-especie-atividade-gridsearch.component.html',
    styleUrls: ['./cdk-especie-atividade-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEspecieAtividadeGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieAtividades: EspecieAtividade[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _especieAtividadeService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieAtividadeService: EspecieAtividadeService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._especieAtividadeService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.especieAtividades = response['entities'];
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

    select(especieAtividade): void {
        this.selected.emit(especieAtividade);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
