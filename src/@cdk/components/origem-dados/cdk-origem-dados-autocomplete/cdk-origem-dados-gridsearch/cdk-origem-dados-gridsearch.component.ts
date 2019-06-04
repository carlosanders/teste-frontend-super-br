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

import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {OrigemDados} from '@cdk/models/origem-dados.model';

@Component({
    selector: 'cdk-origem-dados-gridsearch',
    templateUrl: './cdk-origem-dados-gridsearch.component.html',
    styleUrls: ['./cdk-origem-dados-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkOrigemDadosGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    origemDadoss: OrigemDados[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _origemDadosService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _origemDadosService: OrigemDadosService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._origemDadosService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.origemDadoss = response['entities'];
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

    select(origemDados): void {
        this.selected.emit(origemDados);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
