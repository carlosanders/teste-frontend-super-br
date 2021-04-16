import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {DocumentoIdentificador} from '@cdk/models';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-documento-identificador-autocomplete',
    templateUrl: './cdk-documento-identificador-autocomplete.component.html',
    styleUrls: ['./cdk-documento-identificador-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'documentoIdentificadorAutocomplete',
})
export class CdkDocumentoIdentificadorAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    documentoIdentificadorList: DocumentoIdentificador[];
    documentoIdentificadorListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _documentoIdentificadorService: DocumentoIdentificadorService
    ) {
        this.documentoIdentificadorList = [];
        this.documentoIdentificadorListIsLoading = false;

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
                            'modalidadeDocumentoIdentificador.valor': `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.documentoIdentificadorListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._documentoIdentificadorService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.documentoIdentificadorListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.documentoIdentificadorList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayDocumentoIdentificadorFn(documentoIdentificador): string {
        return documentoIdentificador ? documentoIdentificador.modalidadeDocumentoIdentificador.valor : null;
    }
}
