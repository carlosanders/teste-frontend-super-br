import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {GeneroRelevancia} from '@cdk/models';
import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-genero-relevancia-autocomplete',
    templateUrl: './cdk-genero-relevancia-autocomplete.component.html',
    styleUrls: ['./cdk-genero-relevancia-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'generoRelevanciaAutocomplete',
})
export class CdkGeneroRelevanciaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    generoRelevanciaList: GeneroRelevancia[];
    generoRelevanciaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoRelevanciaService: GeneroRelevanciaService
    ) {
        this.generoRelevanciaList = [];
        this.generoRelevanciaListIsLoading = false;

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
                        this.generoRelevanciaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._generoRelevanciaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.generoRelevanciaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.generoRelevanciaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayGeneroRelevanciaFn(generoRelevancia): string {
        return generoRelevancia ? generoRelevancia.nome : null;
    }
}
