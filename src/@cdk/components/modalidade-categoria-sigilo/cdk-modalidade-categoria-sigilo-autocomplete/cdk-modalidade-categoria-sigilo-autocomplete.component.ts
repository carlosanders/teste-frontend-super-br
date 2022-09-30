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
import {ModalidadeCategoriaSigilo, Pagination} from '@cdk/models';
import {ModalidadeCategoriaSigiloService} from '@cdk/services/modalidade-categoria-sigilo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-modalidade-categoria-sigilo-autocomplete',
    templateUrl: './cdk-modalidade-categoria-sigilo-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-categoria-sigilo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeCategoriaSigiloAutocomplete',
})
export class CdkModalidadeCategoriaSigiloAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    modalidadeCategoriaSigiloList: ModalidadeCategoriaSigilo[];

    modalidadeCategoriaSigiloListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeCategoriaSigiloService: ModalidadeCategoriaSigiloService
    ) {
        this.modalidadeCategoriaSigiloList = [];
        this.modalidadeCategoriaSigiloListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modalidadeCategoriaSigiloList = [];
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
                        this.modalidadeCategoriaSigiloListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeCategoriaSigiloService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeCategoriaSigiloListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeCategoriaSigiloList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeCategoriaSigiloFn(modalidadeCategoriaSigilo): string {
        return modalidadeCategoriaSigilo ? TitleCasePipe.format(modalidadeCategoriaSigilo.valor) : null;
    }
}
