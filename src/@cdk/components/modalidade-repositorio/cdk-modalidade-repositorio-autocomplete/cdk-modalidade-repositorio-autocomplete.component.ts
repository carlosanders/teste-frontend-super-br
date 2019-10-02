import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ModalidadeRepositorio} from '@cdk/models/modalidade-repositorio.model';
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-modalidade-repositorio-autocomplete',
    templateUrl: './cdk-modalidade-repositorio-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-repositorio-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'modalidadeRepositorioAutocomplete',
})
export class CdkModalidadeRepositorioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    modalidadeRepositorioList: ModalidadeRepositorio[];
    modalidadeRepositorioListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeRepositorioService: ModalidadeRepositorioService
    ) {
        this.modalidadeRepositorioList = [];
        this.modalidadeRepositorioListIsLoading = false;

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
                            valor: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.modalidadeRepositorioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modalidadeRepositorioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeRepositorioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.modalidadeRepositorioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeRepositorioFn(modalidadeRepositorio): string {
        return modalidadeRepositorio ? modalidadeRepositorio.valor : null;
    }
}
