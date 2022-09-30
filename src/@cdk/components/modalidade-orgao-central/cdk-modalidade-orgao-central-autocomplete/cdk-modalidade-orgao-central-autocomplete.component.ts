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
import {ModalidadeOrgaoCentral, Pagination} from '@cdk/models';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-modalidade-orgao-central-autocomplete',
    templateUrl: './cdk-modalidade-orgao-central-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-orgao-central-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeOrgaoCentralAutocomplete',
})
export class CdkModalidadeOrgaoCentralAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    modalidadeOrgaoCentralList: ModalidadeOrgaoCentral[];

    modalidadeOrgaoCentralListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService
    ) {
        this.modalidadeOrgaoCentralList = [];
        this.modalidadeOrgaoCentralListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modalidadeOrgaoCentralList = [];
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
                        this.modalidadeOrgaoCentralListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeOrgaoCentralService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeOrgaoCentralListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeOrgaoCentralList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeOrgaoCentralFn(modalidadeOrgaoCentral): string {
        return modalidadeOrgaoCentral ? TitleCasePipe.format(modalidadeOrgaoCentral.valor) : null;
    }
}
