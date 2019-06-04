import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeTransicao} from '@cdk/models/modalidade-transicao.model';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-transicao-autocomplete',
    templateUrl: './cdk-modalidade-transicao-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-transicao-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeTransicaoAutocomplete',
})
export class CdkModalidadeTransicaoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeTransicaoList: ModalidadeTransicao[];
    modalidadeTransicaoListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeTransicaoService: ModalidadeTransicaoService
    ) {
        this.modalidadeTransicaoList = [];
        this.modalidadeTransicaoListIsLoading = false;

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
                        this.modalidadeTransicaoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeTransicaoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeTransicaoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeTransicaoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeTransicaoFn(modalidadeTransicao): string {
        return modalidadeTransicao ? modalidadeTransicao.valor : null;
    }
}
