import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnInit, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-etiqueta-autocomplete',
    templateUrl: './cdk-etiqueta-autocomplete.component.html',
    styleUrls: ['./cdk-etiqueta-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'etiquetaAutocomplete',
})
export class CdkEtiquetaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Output()
    selected = new EventEmitter<any>();

    etiquetaList: Etiqueta[];
    etiquetaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _etiquetaService: EtiquetaService
    ) {
        this.etiquetaList = [];
        this.etiquetaListIsLoading = false;

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
                            nome: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.etiquetaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        let filterParam = '';
                        if (Array.isArray(this.pagination.filter)) {
                            const arrayFilterParam = this.pagination.filter.map((value) => {
                                const orFilter = {
                                    ...value,
                                    ...termFilter
                                };
                                return orFilter;
                            });
                            filterParam = JSON.stringify(arrayFilterParam);
                        } else {
                            const objectFilterParam = {
                                ...this.pagination.filter,
                                ...termFilter
                            };
                            filterParam = JSON.stringify(objectFilterParam);
                        }
                        return this._etiquetaService.query(
                            filterParam,
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.etiquetaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.etiquetaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEtiquetaFn(etiqueta): string {
        return etiqueta ? etiqueta.nome : null;
    }

    onSelected(etiqueta: Etiqueta): void {
        this.selected.emit(etiqueta);
    }
}
