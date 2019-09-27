import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {DocumentoIdentificador} from '@cdk/models/documento-identificador.model';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-documento-identificador-autocomplete',
    templateUrl: './cdk-documento-identificador-autocomplete.component.html',
    styleUrls: ['./cdk-documento-identificador-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'documentoIdentificadorAutocomplete',
})
export class CdkDocumentoIdentificadorAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

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
                    let termFilter = {};
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilter = {
                            ...termFilter,
                            'modalidadeDocumentoIdentificador.valor': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.documentoIdentificadorListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
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
