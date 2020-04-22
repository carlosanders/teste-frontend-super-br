import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ModalidadeAlvoInibidor} from '@cdk/models';
import {ModalidadeAlvoInibidorService} from '@cdk/services/modalidade-alvo-inibidor.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-modalidade-alvo-inibidor-autocomplete',
    templateUrl: './cdk-modalidade-alvo-inibidor-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-alvo-inibidor-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeAlvoInibidorAutocomplete',
})
export class CdkModalidadeAlvoInibidorAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadealvoInibidorList: ModalidadeAlvoInibidor[];
    modalidadealvoInibidorListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeAlvoInibidorService: ModalidadeAlvoInibidorService
    ) {
        this.modalidadealvoInibidorList = [];
        this.modalidadealvoInibidorListIsLoading = false;

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
                            valor: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.modalidadealvoInibidorListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeAlvoInibidorService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadealvoInibidorListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadealvoInibidorList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeAlvoInibidorFn(modalidadealvoInibidor): string {
        return modalidadealvoInibidor ? modalidadealvoInibidor.valor : null;
    }
}
