import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeDocumentoIdentificador} from '@cdk/models/modalidade-documento-identificador.model';
import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-documento-identificador-autocomplete',
    templateUrl: './cdk-modalidade-documento-identificador-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-documento-identificador-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeDocumentoIdentificadorAutocomplete',
})
export class CdkModalidadeDocumentoIdentificadorAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeDocumentoIdentificadorList: ModalidadeDocumentoIdentificador[];
    modalidadeDocumentoIdentificadorListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeDocumentoIdentificadorService: ModalidadeDocumentoIdentificadorService
    ) {
        this.modalidadeDocumentoIdentificadorList = [];
        this.modalidadeDocumentoIdentificadorListIsLoading = false;

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
                        this.modalidadeDocumentoIdentificadorListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeDocumentoIdentificadorService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeDocumentoIdentificadorListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeDocumentoIdentificadorList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeDocumentoIdentificadorFn(modalidadeDocumentoIdentificador): string {
        return modalidadeDocumentoIdentificador ? modalidadeDocumentoIdentificador.valor : null;
    }
}
