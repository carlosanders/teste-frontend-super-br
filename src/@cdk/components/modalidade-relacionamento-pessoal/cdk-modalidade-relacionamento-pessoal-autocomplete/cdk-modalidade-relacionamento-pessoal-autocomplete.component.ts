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
import {ModalidadeRelacionamentoPessoal, Pagination} from '@cdk/models';
import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-modalidade-relacionamento-pessoal-autocomplete',
    templateUrl: './cdk-modalidade-relacionamento-pessoal-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-relacionamento-pessoal-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeRelacionamentoPessoalAutocomplete',
})
export class CdkModalidadeRelacionamentoPessoalAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    modalidadeRelacionamentoPessoalList: ModalidadeRelacionamentoPessoal[];

    modalidadeRelacionamentoPessoalListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeRelacionamentoPessoalService: ModalidadeRelacionamentoPessoalService
    ) {
        this.modalidadeRelacionamentoPessoalList = [];
        this.modalidadeRelacionamentoPessoalListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modalidadeRelacionamentoPessoalList = [];
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
                        this.modalidadeRelacionamentoPessoalListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeRelacionamentoPessoalService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeRelacionamentoPessoalListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeRelacionamentoPessoalList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeRelacionamentoPessoalFn(modalidadeRelacionamentoPessoal): string {
        return modalidadeRelacionamentoPessoal ? TitleCasePipe.format(modalidadeRelacionamentoPessoal.valor) : null;
    }
}
