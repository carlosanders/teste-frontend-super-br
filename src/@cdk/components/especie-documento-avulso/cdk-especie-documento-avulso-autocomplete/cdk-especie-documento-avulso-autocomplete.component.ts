import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieDocumentoAvulso} from '@cdk/models';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-especie-documento-avulso-autocomplete',
    templateUrl: './cdk-especie-documento-avulso-autocomplete.component.html',
    styleUrls: ['./cdk-especie-documento-avulso-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'especieDocumentoAvulsoAutocomplete',
})
export class CdkEspecieDocumentoAvulsoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    especieDocumentoAvulsoList: EspecieDocumentoAvulso[];
    especieDocumentoAvulsoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieDocumentoAvulsoService: EspecieDocumentoAvulsoService
    ) {
        this.especieDocumentoAvulsoList = [];
        this.especieDocumentoAvulsoListIsLoading = false;

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
                        this.especieDocumentoAvulsoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._especieDocumentoAvulsoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.especieDocumentoAvulsoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.especieDocumentoAvulsoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieDocumentoAvulsoFn(especieDocumentoAvulso): string {
        return especieDocumentoAvulso ? especieDocumentoAvulso.nome : null;
    }
}
