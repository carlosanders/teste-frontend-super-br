import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-processo-search-autocomplete',
    templateUrl: './cdk-processo-search-autocomplete.component.html',
    styleUrls: ['./cdk-processo-search-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'processoSearchAutocomplete',
})
export class CdkProcessoSearchAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    processoSearchList: Processo[];
    processoSearchListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _processoService: ProcessoService
    ) {
        this.processoSearchList = [];
        this.processoSearchListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    let termFilter = {};
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilter = {
                            ...termFilter,
                            NUP: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.processoSearchListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._processoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.processoSearchListIsLoading = false),
                                catchError(() => of([]))
                            );

                        // value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        //     termFilter = [
                        //         {
                        //             nome: `like:%${bit}%`
                        //         },
                        //         {
                        //             numeroDocumentoPrincipal: `like:%${bit}%`
                        //         }
                        //     ];
                        // });
                        // if (typeof value === 'string') {
                        //     this.processoSearchListIsLoading = true;
                        //     this._changeDetectorRef.markForCheck();
                        //     const filterParam = {
                        //         ...this.pagination.filter,
                        //         ...termFilter
                        //     };
                        //     return this._processoService.search(
                        //         JSON.stringify(filterParam),
                        //         this.pagination.limit,
                        //         this.pagination.offset,
                        //         JSON.stringify(this.pagination.sort),
                        //         JSON.stringify(this.pagination.populate))
                        //         .pipe(
                        //             finalize(() => this.processoSearchListIsLoading = false),
                        //             catchError(() => of([]))
                        //         );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.processoSearchList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayProcessoFn(processoSearch: Processo): string {
        let retorno = processoSearch ? processoSearch.NUP + ' HURRU!' : '';
        return retorno;
    }
}
