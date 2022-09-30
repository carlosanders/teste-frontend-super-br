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
import {ContaEmail, Pagination} from '@cdk/models';
import {ContaEmailService} from '@cdk/services/conta-email.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-conta-email-autocomplete',
    templateUrl: './cdk-conta-email-autocomplete.component.html',
    styleUrls: ['./cdk-conta-email-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'contaEmailAutocomplete',
})
export class CdkContaEmailAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    contaEmailList: ContaEmail[];

    @Input()
    contaEmailListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _contaEmailService: ContaEmailService
    ) {
        this.contaEmailList = [];
        this.contaEmailListIsLoading = false;

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
                            nome: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.contaEmailListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._contaEmailService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate),
                            JSON.stringify(this.pagination['context']))
                            .pipe(
                                finalize(() => this.contaEmailListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.contaEmailList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayContaEmailFn(contaEmail): string {
        return contaEmail ? TitleCasePipe.format(contaEmail.nome) : '';
    }
}
