import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ModalidadeDestinacao} from '@cdk/models';
import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-modalidade-destinacao-autocomplete',
    templateUrl: './cdk-modalidade-destinacao-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-destinacao-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeDestinacaoAutocomplete',
})
export class CdkModalidadeDestinacaoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    modalidadeDestinacaoList: ModalidadeDestinacao[];
    modalidadeDestinacaoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeDestinacaoService: ModalidadeDestinacaoService
    ) {
        this.modalidadeDestinacaoList = [];
        this.modalidadeDestinacaoListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        andxFilter.push({
                            valor: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.modalidadeDestinacaoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeDestinacaoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeDestinacaoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeDestinacaoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeDestinacaoFn(modalidadeDestinacao): string {
        return modalidadeDestinacao ? modalidadeDestinacao.valor : null;
    }
}
