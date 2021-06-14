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
import {ModalidadeVinculacaoProcesso, Pagination} from '@cdk/models';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';

@Component({
    selector: 'cdk-modalidade-vinculacao-processo-autocomplete',
    templateUrl: './cdk-modalidade-vinculacao-processo-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-processo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeVinculacaoProcessoAutocomplete',
})
export class CdkModalidadeVinculacaoProcessoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    modalidadeVinculacaoProcessoList: ModalidadeVinculacaoProcesso[];
    modalidadeVinculacaoProcessoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeVinculacaoProcessoService: ModalidadeVinculacaoProcessoService
    ) {
        this.modalidadeVinculacaoProcessoList = [];
        this.modalidadeVinculacaoProcessoListIsLoading = false;

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
                        this.modalidadeVinculacaoProcessoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeVinculacaoProcessoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeVinculacaoProcessoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeVinculacaoProcessoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeVinculacaoProcessoFn(modalidadeVinculacaoProcesso): string {
        return modalidadeVinculacaoProcesso ? modalidadeVinculacaoProcesso.valor : null;
    }
}
