import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeNotificacao} from '@cdk/models/modalidade-notificacao.model';
import {ModalidadeNotificacaoService} from '@cdk/services/modalidade-notificacao.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-notificacao-autocomplete',
    templateUrl: './cdk-modalidade-notificacao-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-notificacao-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeNotificacaoAutocomplete',
})
export class CdkModalidadeNotificacaoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeNotificacaoList: ModalidadeNotificacao[];
    modalidadeNotificacaoListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeNotificacaoService: ModalidadeNotificacaoService
    ) {
        this.modalidadeNotificacaoList = [];
        this.modalidadeNotificacaoListIsLoading = false;

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
                        this.modalidadeNotificacaoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeNotificacaoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeNotificacaoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeNotificacaoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeNotificacaoFn(modalidadeNotificacao): string {
        return modalidadeNotificacao ? modalidadeNotificacao.valor : null;
    }
}
