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

import {ConfiguracaoNup, Pagination} from '@cdk/models';
import {ConfiguracaoNupService} from '@cdk/services/configuracao-nup.service';

@Component({
    selector: 'cdk-configuracao-nup-gridsearch',
    templateUrl: './cdk-configuracao-nup-gridsearch.component.html',
    styleUrls: ['./cdk-configuracao-nup-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkConfiguracaoNupGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    configuracoesNup: ConfiguracaoNup[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _configuracaoNupService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _configuracaoNupService: ConfiguracaoNupService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {
        this.loading = true;

        this._configuracaoNupService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.configuracoesNup = response['entities'];
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

    select(configuracaoNup): void {
        this.selected.emit(configuracaoNup);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
