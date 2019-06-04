import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeOrgaoCentral} from '@cdk/models/modalidade-orgao-central.model';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-orgao-central-autocomplete',
    templateUrl: './cdk-modalidade-orgao-central-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-orgao-central-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeOrgaoCentralAutocomplete',
})
export class CdkModalidadeOrgaoCentralAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeOrgaoCentralList: ModalidadeOrgaoCentral[];
    modalidadeOrgaoCentralListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService
    ) {
        this.modalidadeOrgaoCentralList = [];
        this.modalidadeOrgaoCentralListIsLoading = false;

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
                        this.modalidadeOrgaoCentralListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            'valor': `like:${value}%`
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
        ).subscribe(response => {
            this.modalidadeOrgaoCentralList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeOrgaoCentralFn(modalidadeOrgaoCentral): string {
        return modalidadeOrgaoCentral ? modalidadeOrgaoCentral.valor : null;
    }
}
