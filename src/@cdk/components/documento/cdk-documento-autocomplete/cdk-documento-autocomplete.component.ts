import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Documento} from '@cdk/models/documento.model';
import {DocumentoService} from '@cdk/services/documento.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-documento-autocomplete',
    templateUrl: './cdk-documento-autocomplete.component.html',
    styleUrls: ['./cdk-documento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'documentoAutocomplete',
})
export class CdkDocumentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    documentoList: Documento[];
    documentoListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _documentoService: DocumentoService
    ) {
        this.documentoList = [];
        this.documentoListIsLoading = false;

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
                            'tipoDocumento.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.documentoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._documentoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.documentoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.documentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayDocumentoFn(documento): string {
        return documento ? documento.tipoDocumento.nome : null;
    }
}
