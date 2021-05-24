import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {TipoDocumento} from '@cdk/models';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-tipo-documento-autocomplete',
    templateUrl: './cdk-tipo-documento-autocomplete.component.html',
    styleUrls: ['./cdk-tipo-documento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'tipoDocumentoAutocomplete',
})
export class CdkTipoDocumentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    tipoDocumentoList: TipoDocumento[];
    tipoDocumentoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoDocumentoService: TipoDocumentoService
    ) {
        this.tipoDocumentoList = [];
        this.tipoDocumentoListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'string') {
                        if (value.length >= 2) {
                            const andxFilter = [];
                            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                                andxFilter.push({
                                    nome: `like:%${bit}%`
                                });
                            });
                            if (andxFilter.length > 0) {
                                this.tipoDocumentoListIsLoading = true;
                                this._changeDetectorRef.detectChanges();
                                const filterParam = {
                                    ...this.pagination.filter,
                                    andX: andxFilter
                                };
                                return this._tipoDocumentoService.query(
                                    JSON.stringify(filterParam),
                                    this.pagination.limit,
                                    this.pagination.offset,
                                    JSON.stringify(this.pagination.sort),
                                    JSON.stringify(this.pagination.populate))
                                    .pipe(
                                        finalize(() => this.tipoDocumentoListIsLoading = false),
                                        catchError(() => of([]))
                                    );
                            }
                        }
                    }
                    this.tipoDocumentoList = [];
                    return of([]);
                }
            )
        ).subscribe((response) => {
            this.tipoDocumentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayTipoDocumentoFn(tipoDocumento): string {
        return tipoDocumento ? tipoDocumento.nome : null;
    }
}
