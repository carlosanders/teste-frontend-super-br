import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieRelevancia} from '@cdk/models';
import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-especie-relevancia-autocomplete',
    templateUrl: './cdk-especie-relevancia-autocomplete.component.html',
    styleUrls: ['./cdk-especie-relevancia-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'especieRelevanciaAutocomplete',
})
export class CdkEspecieRelevanciaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    especieRelevanciaList: EspecieRelevancia[];
    especieRelevanciaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieRelevanciaService: EspecieRelevanciaService
    ) {
        this.especieRelevanciaList = [];
        this.especieRelevanciaListIsLoading = false;

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
                            nome: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.especieRelevanciaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._especieRelevanciaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.especieRelevanciaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.especieRelevanciaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieRelevanciaFn(especieRelevancia): string {
        return especieRelevancia ? especieRelevancia.nome : null;
    }
}
