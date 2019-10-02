import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {AreaTrabalho} from '@cdk/models/area-trabalho.model';
import {AreaTrabalhoService} from '@cdk/services/area-trabalho.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-area-trabalho-autocomplete',
    templateUrl: './cdk-area-trabalho-autocomplete.component.html',
    styleUrls: ['./cdk-area-trabalho-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'areaTrabalhoAutocomplete',
})
export class CdkAreaTrabalhoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    areaTrabalhoList: AreaTrabalho[];
    areaTrabalhoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _areaTrabalhoService: AreaTrabalhoService
    ) {
        this.areaTrabalhoList = [];
        this.areaTrabalhoListIsLoading = false;

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
                            'usuario.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.areaTrabalhoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._areaTrabalhoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.areaTrabalhoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.areaTrabalhoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayAreaTrabalhoFn(areaTrabalho): string {
        return areaTrabalho ? areaTrabalho.usuario.nome : null;
    }
}
