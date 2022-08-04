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

import {Pagination, Usuario} from '@cdk/models';

import {UsuarioService} from '@cdk/services/usuario.service';

@Component({
    selector: 'cdk-usuario-gridsearch',
    templateUrl: './cdk-usuario-gridsearch.component.html',
    styleUrls: ['./cdk-usuario-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUsuarioGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    usuarios: Usuario[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _usuarioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _usuarioService: UsuarioService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._usuarioService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate),
            JSON.stringify(params['context']))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.usuarios = response['entities'];
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

    doResetTableDefinitions(): void {
        this.reload({
            ...this.pagination,
            sort: {},
            limit: undefined,
            offset: undefined
        })
    }

    select(usuario): void {
        this.selected.emit(usuario);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
