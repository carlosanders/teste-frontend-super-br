import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeTipoInibidor} from '@cdk/models/modalidade-tipo-inibidor.model';
import {ModalidadeTipoInibidorService} from '@cdk/services/modalidade-tipo-inibidor.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-tipo-inibidor-autocomplete',
    templateUrl: './cdk-modalidade-tipo-inibidor-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-tipo-inibidor-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeTipoInibidorAutocomplete',
})
export class CdkModalidadeTipoInibidorAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeTipoInibidorList: ModalidadeTipoInibidor[];
    modalidadeTipoInibidorListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeTipoInibidorService: ModalidadeTipoInibidorService
    ) {
        this.modalidadeTipoInibidorList = [];
        this.modalidadeTipoInibidorListIsLoading = false;

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
                        this.modalidadeTipoInibidorListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeTipoInibidorService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeTipoInibidorListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeTipoInibidorList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeTipoInibidorFn(modalidadeTipoInibidor): string {
        return modalidadeTipoInibidor ? modalidadeTipoInibidor.valor : null;
    }
}
