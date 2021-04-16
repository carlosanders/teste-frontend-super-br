import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Relevancia} from '@cdk/models';
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-relevancia-autocomplete',
    templateUrl: './cdk-relevancia-autocomplete.component.html',
    styleUrls: ['./cdk-relevancia-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'relevanciaAutocomplete',
})
export class CdkRelevanciaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    relevanciaList: Relevancia[];
    relevanciaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _relevanciaService: RelevanciaService
    ) {
        this.relevanciaList = [];
        this.relevanciaListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        andxFilter.push({
                            processo: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.relevanciaListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._relevanciaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.relevanciaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.relevanciaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayRelevanciaFn(relevancia): string {
        return relevancia ? relevancia.especieRelevancia.nome : null;
    }
}
