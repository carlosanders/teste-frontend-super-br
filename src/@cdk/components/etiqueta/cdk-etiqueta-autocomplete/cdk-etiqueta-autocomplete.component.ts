import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnInit, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-etiqueta-autocomplete',
    templateUrl: './cdk-etiqueta-autocomplete.component.html',
    styleUrls: ['./cdk-etiqueta-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'etiquetaAutocomplete',
})
export class CdkEtiquetaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    @Output()
    selected = new EventEmitter<any>();

    etiquetaList: Etiqueta[];
    etiquetaListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

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
                            'nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.etiquetaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._etiquetaService.query(
                            JSON.stringify(filterParam),
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
