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
import {cdkAnimations} from '@cdk/animations';
import {catchError, finalize} from 'rxjs/operators';
import {Pagination} from '@cdk/models/pagination';
import {Modulo} from '../../../../models';
import {ModuloService} from '../../../../services/modulo.service';

@Component({
    selector: 'cdk-modulo-gridsearch',
    templateUrl: './cdk-modulo-gridsearch.component.html',
    styleUrls: ['./cdk-modulo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModuloGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modulos: Modulo[];

    total = 0;

    loading: boolean;

    @Input()
    displayedColumns: string[] = [
        'select',
        'id',
        'nome',
        'descricao',
        'sigla',
        'ativo',
        'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _moduloService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _moduloService: ModuloService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {
        this.loading = true;
        this._moduloService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.modulos = response['entities'];
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
        this.load(params);
    }

    select(modulo): void {
        this.selected.emit(modulo);
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
