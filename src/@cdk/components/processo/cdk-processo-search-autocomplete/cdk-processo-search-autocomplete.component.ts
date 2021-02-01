import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, HostListener, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from 'rxjs/operators';
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
    mobileMode: boolean;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        let innerWidth = window.innerWidth;
        if(innerWidth<=600) {
            this.mobileMode = true;
        }
        else {
            this.mobileMode = false;
        }
    }

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
            tap(() => this.processoSearchList = []),
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value: string) => {
                    let termFilterNUP = {};
                    value = value.split('.').join('').split('/').join('').replace('-', '');
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilterNUP = {
                            NUP: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string' && (termFilterNUP)) {
                        this.processoSearchListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilterNUP
                        };
                        return this._processoService.search(
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
        ).subscribe(response => {
            this.processoSearchList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });

        let innerWidth = window.innerWidth;
        if(innerWidth<=600) {
            this.mobileMode = true;
        }
        else {
            this.mobileMode = false;
        }
    }

    displayProcessoFn(processoSearch: Processo): string {
        return processoSearch ? processoSearch.NUPFormatado : '';
    }
}
