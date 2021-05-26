import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination, VinculacaoUsuario} from '@cdk/models';
import {VinculacaoPessoaUsuarioService} from '../../../../services/vinculacao-pessoa-usuario.service';

@Component({
    selector: 'cdk-vinculacao-pessoa-usuario-gridsearch',
    templateUrl: './cdk-vinculacao-pessoa-usuario-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-usuario-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoPessoaUsuarioGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacoesPessoasUsuarios: VinculacaoUsuario[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoPessoaUsuarioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoPessoaUsuarioService: VinculacaoPessoaUsuarioService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._vinculacaoPessoaUsuarioService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.vinculacoesPessoasUsuarios = response['entities'];
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

    select(vinculacaoPessoaUsuario): void {
        this.selected.emit(vinculacaoPessoaUsuario);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
