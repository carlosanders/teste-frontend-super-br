import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {AssuntoAdministrativo} from '@cdk/models';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-assunto-administrativo-autocomplete',
    templateUrl: './cdk-assunto-administrativo-autocomplete.component.html',
    styleUrls: ['./cdk-assunto-administrativo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'assuntoAdministrativoAutocomplete',
})
export class CdkAssuntoAdministrativoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    assuntoAdministrativoList: AssuntoAdministrativo[];
    assuntoAdministrativoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _assuntoAdministrativoService: AssuntoAdministrativoService
    ) {
        this.assuntoAdministrativoList = [];
        this.assuntoAdministrativoListIsLoading = false;

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
                        this.assuntoAdministrativoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._assuntoAdministrativoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.assuntoAdministrativoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.assuntoAdministrativoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayAssuntoAdministrativoFn(assuntoAdministrativo): string {
        return assuntoAdministrativo ? assuntoAdministrativo.nome + '(' + assuntoAdministrativo.id + ')' : null;
    }
}
