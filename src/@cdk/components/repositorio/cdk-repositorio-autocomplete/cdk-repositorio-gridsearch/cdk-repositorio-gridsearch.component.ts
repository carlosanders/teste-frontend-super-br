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

import {RepositorioService} from '@cdk/services/repositorio.service';
import {Repositorio} from '@cdk/models';

@Component({
    selector: 'cdk-repositorio-gridsearch',
    templateUrl: './cdk-repositorio-gridsearch.component.html',
    styleUrls: ['./cdk-repositorio-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkRepositorioGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    repositorios: Repositorio[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _repositorioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _repositorioService: RepositorioService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._repositorioService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.repositorios = response['entities'];
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

    select(repositorio): void {
        this.selected.emit(repositorio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
