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

import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {Desentranhamento} from '@cdk/models/desentranhamento.model';

@Component({
    selector: 'cdk-desentranhamento-gridsearch',
    templateUrl: './cdk-desentranhamento-gridsearch.component.html',
    styleUrls: ['./cdk-desentranhamento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDesentranhamentoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    desentranhamentos: Desentranhamento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _desentranhamentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _desentranhamentoService: DesentranhamentoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._desentranhamentoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.desentranhamentos = response['entities'];
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

    select(desentranhamento): void {
        this.selected.emit(desentranhamento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
