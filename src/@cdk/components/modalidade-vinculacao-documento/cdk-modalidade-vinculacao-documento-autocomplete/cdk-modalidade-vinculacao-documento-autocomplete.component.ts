import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ModalidadeVinculacaoDocumento} from '@cdk/models';
import {ModalidadeVinculacaoDocumentoService} from '@cdk/services/modalidade-vinculacao-documento.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-modalidade-vinculacao-documento-autocomplete',
    templateUrl: './cdk-modalidade-vinculacao-documento-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-documento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeVinculacaoDocumentoAutocomplete',
})
export class CdkModalidadeVinculacaoDocumentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    modalidadeVinculacaoDocumentoList: ModalidadeVinculacaoDocumento[];
    modalidadeVinculacaoDocumentoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeVinculacaoDocumentoService: ModalidadeVinculacaoDocumentoService
    ) {
        this.modalidadeVinculacaoDocumentoList = [];
        this.modalidadeVinculacaoDocumentoListIsLoading = false;

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
                        this.modalidadeVinculacaoDocumentoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeVinculacaoDocumentoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeVinculacaoDocumentoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeVinculacaoDocumentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeVinculacaoDocumentoFn(modalidadeVinculacaoDocumento): string {
        return modalidadeVinculacaoDocumento ? modalidadeVinculacaoDocumento.valor : null;
    }
}
