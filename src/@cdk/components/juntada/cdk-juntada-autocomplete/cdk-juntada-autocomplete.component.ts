import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Juntada} from '@cdk/models/juntada.model';
import {JuntadaService} from '@cdk/services/juntada.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-juntada-autocomplete',
    templateUrl: './cdk-juntada-autocomplete.component.html',
    styleUrls: ['./cdk-juntada-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'juntadaAutocomplete',
})
export class CdkJuntadaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    juntadaList: Juntada[];
    juntadaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _juntadaService: JuntadaService
    ) {
        this.juntadaList = [];
        this.juntadaListIsLoading = false;

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
                            descricao: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.juntadaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._juntadaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.juntadaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.juntadaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayJuntadaFn(juntada): string {
        return juntada ? juntada.descricao : null;
    }
}
