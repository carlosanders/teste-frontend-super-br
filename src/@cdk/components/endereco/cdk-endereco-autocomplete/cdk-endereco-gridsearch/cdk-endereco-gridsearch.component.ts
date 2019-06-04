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

import {EnderecoService} from '@cdk/services/endereco.service';
import {Endereco} from '@cdk/models/endereco.model';

@Component({
    selector: 'cdk-endereco-gridsearch',
    templateUrl: './cdk-endereco-gridsearch.component.html',
    styleUrls: ['./cdk-endereco-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEnderecoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    enderecos: Endereco[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _enderecoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _enderecoService: EnderecoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._enderecoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.enderecos = response['entities'];
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

    select(endereco): void {
        this.selected.emit(endereco);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
