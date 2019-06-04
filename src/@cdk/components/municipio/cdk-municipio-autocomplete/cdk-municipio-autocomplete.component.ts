import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Municipio} from '@cdk/models/municipio.model';
import {MunicipioService} from '@cdk/services/municipio.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-municipio-autocomplete',
    templateUrl: './cdk-municipio-autocomplete.component.html',
    styleUrls: ['./cdk-municipio-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'municipioAutocomplete',
})
export class CdkMunicipioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    municipioList: Municipio[];
    municipioListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _municipioService: MunicipioService
    ) {
        this.municipioList = [];
        this.municipioListIsLoading = false;

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
                        this.municipioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._municipioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.municipioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.municipioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayMunicipioFn(municipio): string {
        return municipio ? municipio.nome : null;
    }
}
