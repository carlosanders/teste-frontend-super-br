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
import {ModalidadeRepresentante, Pagination} from '@cdk/models';
import {ModalidadeRepresentanteService} from '@cdk/services/modalidade-representante.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-modalidade-representante-autocomplete',
    templateUrl: './cdk-modalidade-representante-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-representante-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeRepresentanteAutocomplete',
})
export class CdkModalidadeRepresentanteAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    modalidadeRepresentanteList: ModalidadeRepresentante[];

    modalidadeRepresentanteListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeRepresentanteService: ModalidadeRepresentanteService
    ) {
        this.modalidadeRepresentanteList = [];
        this.modalidadeRepresentanteListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modalidadeRepresentanteList = [];
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
                        this.modalidadeRepresentanteListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeRepresentanteService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeRepresentanteListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeRepresentanteList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeRepresentanteFn(modalidadeRepresentante): string {
        return modalidadeRepresentante ? TitleCasePipe.format(modalidadeRepresentante.valor) : null;
    }
}
