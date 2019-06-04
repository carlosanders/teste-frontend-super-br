import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeMeio} from '@cdk/models/modalidade-meio.model';
import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-meio-autocomplete',
    templateUrl: './cdk-modalidade-meio-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-meio-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeMeioAutocomplete',
})
export class CdkModalidadeMeioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeMeioList: ModalidadeMeio[];
    modalidadeMeioListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeMeioService: ModalidadeMeioService
    ) {
        this.modalidadeMeioList = [];
        this.modalidadeMeioListIsLoading = false;

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
                        this.modalidadeMeioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeMeioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeMeioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeMeioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeMeioFn(modalidadeMeio): string {
        let displayed = modalidadeMeio ? modalidadeMeio.valor : '';
        return displayed;
    }
}
