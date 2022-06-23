import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Pagination, Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';

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

    @Input()
    searchField = 'NUP';

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    mobileMode: boolean;

    processoSearchList: Processo[];
    processoSearchListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _processoService: ProcessoService
    ) {
        this.processoSearchList = [];
        this.processoSearchListIsLoading = false;

        this.pagination = new Pagination();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
        const innerWidth = window.innerWidth;
        if (innerWidth <= 600) {
            this.mobileMode = true;
        } else {
            this.mobileMode = false;
        }
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.processoSearchList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            tap(() => this.processoSearchList = []),
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 4),
            switchMap((value: string) => {
                    const termFilter = [];
                    const filters = {};

                    if (this.searchField === 'outroNumero') {
                        filters[this.searchField] = `like:${value.trim()}%`;
                        termFilter.push(filters);
                        // value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        //     const filters = {};
                        //     filters[this.searchField] = `like:${bit}%`;
                        //     termFilter.push(filters);
                        // });
                    } else {
                        value = value.split('.').join('').split('/').join('').replace('-', '');
                        filters[this.searchField] = `like:${value.trim()}%`;
                        termFilter.push(filters);
                        // value = value.split('.').join('').split('/').join('').replace('-', '');
                        // value.split(' ').map(bit => bit.replace(/[^\d]+/g, '')).filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        //     const filters = {};
                        //     filters[this.searchField] = `like:${bit}%`;
                        //     termFilter.push(filters);
                        // });
                    }

                    if (typeof value === 'string' && (termFilter.length)) {
                        this.processoSearchListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: termFilter
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
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.processoSearchList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });

        const innerWidth = window.innerWidth;
        if (innerWidth <= 600) {
            this.mobileMode = true;
        } else {
            this.mobileMode = false;
        }
    }

    displayProcessoFn(processoSearch: Processo): string {
        if (processoSearch) {
            if (this.searchField === 'outroNumero') {
                return processoSearch.outroNumero;
            } else {
                return processoSearch.NUPFormatado;
            }
        }
        return processoSearch ? processoSearch.NUPFormatado : '';
    }
}
