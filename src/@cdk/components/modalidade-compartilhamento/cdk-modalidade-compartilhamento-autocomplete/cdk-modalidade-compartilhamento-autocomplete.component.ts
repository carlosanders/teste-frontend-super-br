import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ModalidadeCompartilhamento, Pagination} from '@cdk/models';
import {ModalidadeCompartilhamentoService} from '@cdk/services/modalidade-compartilhamento.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';

@Component({
    selector: 'cdk-modalidade-compartilhamento-autocomplete',
    templateUrl: './cdk-modalidade-compartilhamento-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-compartilhamento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeCompartilhamentoAutocomplete',
})
export class CdkModalidadeCompartilhamentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    modalidadeCompartilhamentoList: ModalidadeCompartilhamento[];

    modalidadeCompartilhamentoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeCompartilhamentoService: ModalidadeCompartilhamentoService
    ) {
        this.modalidadeCompartilhamentoList = [];
        this.modalidadeCompartilhamentoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modalidadeCompartilhamentoList = [];
        }
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
                        this.modalidadeCompartilhamentoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination?.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeCompartilhamentoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeCompartilhamentoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeCompartilhamentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeCompartilhamentoFn(modalidadeCompartilhamento): string {
        return modalidadeCompartilhamento ? modalidadeCompartilhamento.valor : null;
    }
}
