import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeVinculacaoProcesso} from '@cdk/models/modalidade-vinculacao-processo.model';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-vinculacao-processo-autocomplete',
    templateUrl: './cdk-modalidade-vinculacao-processo-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-processo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeVinculacaoProcessoAutocomplete',
})
export class CdkModalidadeVinculacaoProcessoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeVinculacaoProcessoList: ModalidadeVinculacaoProcesso[];
    modalidadeVinculacaoProcessoListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

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
                    let termFilter = {};
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilter = {
                            ...termFilter,
                            'valor': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.modalidadeVinculacaoProcessoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
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
        ).subscribe(response => {
            this.modalidadeVinculacaoProcessoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeVinculacaoProcessoFn(modalidadeVinculacaoProcesso): string {
        return modalidadeVinculacaoProcesso ? modalidadeVinculacaoProcesso.valor : null;
    }
}
