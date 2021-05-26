import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ModalidadeGarantia} from '@cdk/models';
import {ModalidadeGarantiaService} from '@cdk/services/modalidade-garantia.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-modalidade-garantia-autocomplete',
    templateUrl: './cdk-modalidade-garantia-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-garantia-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeGarantiaAutocomplete',
})
export class CdkModalidadeGarantiaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    modalidadeGarantiaList: ModalidadeGarantia[];
    modalidadeGarantiaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeGarantiaService: ModalidadeGarantiaService
    ) {
        this.modalidadeGarantiaList = [];
        this.modalidadeGarantiaListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        andxFilter.push({
                            valor: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.modalidadeGarantiaListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeGarantiaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeGarantiaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeGarantiaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeGarantiaFn(modalidadeGarantia): string {
        return modalidadeGarantia ? modalidadeGarantia.valor : null;
    }
}
