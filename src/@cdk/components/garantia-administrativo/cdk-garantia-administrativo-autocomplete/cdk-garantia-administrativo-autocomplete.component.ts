import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {GarantiaAdministrativo} from '@cdk/models/garantia-administrativo.model';
import {GarantiaAdministrativoService} from '@cdk/services/garantia-administrativo.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-garantia-administrativo-autocomplete',
    templateUrl: './cdk-garantia-administrativo-autocomplete.component.html',
    styleUrls: ['./cdk-garantia-administrativo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'garantiaAdministrativoAutocomplete',
})
export class CdkGarantiaAdministrativoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    garantiaAdministrativoList: GarantiaAdministrativo[];
    garantiaAdministrativoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _garantiaAdministrativoService: GarantiaAdministrativoService
    ) {
        this.garantiaAdministrativoList = [];
        this.garantiaAdministrativoListIsLoading = false;

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
                        this.garantiaAdministrativoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._garantiaAdministrativoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.garantiaAdministrativoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.garantiaAdministrativoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayGarantiaAdministrativoFn(garantiaAdministrativo): string {
        return garantiaAdministrativo ? garantiaAdministrativo.nome + '(' + garantiaAdministrativo.id + ')' : null;
    }
}
