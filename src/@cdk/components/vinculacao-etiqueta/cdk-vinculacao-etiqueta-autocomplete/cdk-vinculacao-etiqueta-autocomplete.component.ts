import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-vinculacao-etiqueta-autocomplete',
    templateUrl: './cdk-vinculacao-etiqueta-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'vinculacaoEtiquetaAutocomplete',
})
export class CdkVinculacaoEtiquetaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    vinculacaoEtiquetaList: VinculacaoEtiqueta[];
    vinculacaoEtiquetaListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService
    ) {
        this.vinculacaoEtiquetaList = [];
        this.vinculacaoEtiquetaListIsLoading = false;

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
                            'etiqueta.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.vinculacaoEtiquetaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            'etiqueta.nome': `like:${value}%`
                        };
                        return this._vinculacaoEtiquetaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoEtiquetaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.vinculacaoEtiquetaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoEtiquetaFn(vinculacaoEtiqueta): string {
        return vinculacaoEtiqueta ? vinculacaoEtiqueta.etiqueta.nome : null;
    }
}
