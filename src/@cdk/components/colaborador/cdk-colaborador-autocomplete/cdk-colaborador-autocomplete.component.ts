import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Colaborador} from '@cdk/models';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-colaborador-autocomplete',
    templateUrl: './cdk-colaborador-autocomplete.component.html',
    styleUrls: ['./cdk-colaborador-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'colaboradorAutocomplete',
})
export class CdkColaboradorAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    colaboradorList: Colaborador[];
    colaboradorListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _colaboradorService: ColaboradorService
    ) {
        this.colaboradorList = [];
        this.colaboradorListIsLoading = false;

        this.pagination = new Pagination();
        this.pagination.populate = ['populateAll', 'usuario'];
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
                            'usuario.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.colaboradorListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._colaboradorService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.colaboradorListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.colaboradorList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayColaboradorFn(colaborador): string {
        return colaborador ? colaborador.usuario.nome : null;
    }
}
