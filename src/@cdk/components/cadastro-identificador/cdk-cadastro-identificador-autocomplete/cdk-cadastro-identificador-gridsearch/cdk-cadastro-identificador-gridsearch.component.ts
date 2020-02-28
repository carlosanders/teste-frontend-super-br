import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models';

import {CadastroIdentificadorService} from '@cdk/services/cadastro-identificador.service';
import {CadastroIdentificador} from '@cdk/models';

@Component({
    selector: 'cdk-cadastro-identificador-gridsearch',
    templateUrl: './cdk-cadastro-identificador-gridsearch.component.html',
    styleUrls: ['./cdk-cadastro-identificador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkCadastroIdentificadorGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

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
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._cadastroIdentificadorService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.cadastroIdentificadors = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

   reload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        };
        this.load (params);
    }

    select(cadastroIdentificador): void {
        this.selected.emit(cadastroIdentificador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
