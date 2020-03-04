import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {VinculacaoModelo} from '@cdk/models';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-modelo-autocomplete',
    templateUrl: './cdk-vinculacao-modelo-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-modelo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'vinculacaoModeloAutocomplete',
})
export class CdkVinculacaoModeloAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    vinculacaoModeloList: VinculacaoModelo[];
    vinculacaoModeloListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoModeloService: VinculacaoModeloService
    ) {
        this.vinculacaoModeloList = [];
        this.vinculacaoModeloListIsLoading = false;

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
                            'modelo.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.vinculacaoModeloListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._vinculacaoModeloService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoModeloListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.vinculacaoModeloList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoModeloFn(vinculacaoModelo): string {
        return vinculacaoModelo ? vinculacaoModelo.modelo.nome : null;
    }
}
