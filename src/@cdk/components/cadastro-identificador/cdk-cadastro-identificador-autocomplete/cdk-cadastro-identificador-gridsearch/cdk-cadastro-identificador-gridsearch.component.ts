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

import {CadastroIdentificadorService} from '@cdk/services/cadastro-identificador.service';
import {CadastroIdentificador} from '@cdk/models/cadastro-identificador.model';

@Component({
    selector: 'cdk-cadastro-identificador-gridsearch',
    templateUrl: './cdk-cadastro-identificador-gridsearch.component.html',
    styleUrls: ['./cdk-cadastro-identificador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkCadastroIdentificadorGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    cadastroIdentificadors: CadastroIdentificador[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _cadastroIdentificadorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cadastroIdentificadorService: CadastroIdentificadorService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._cadastroIdentificadorService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.cadastroIdentificadors = response['entities'];
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

    select(cadastroIdentificador): void {
        this.selected.emit(cadastroIdentificador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
