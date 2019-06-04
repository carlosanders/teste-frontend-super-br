import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-componente-digital-autocomplete',
    templateUrl: './cdk-componente-digital-autocomplete.component.html',
    styleUrls: ['./cdk-componente-digital-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'componenteDigitalAutocomplete',
})
export class CdkComponenteDigitalAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    componenteDigitalList: ComponenteDigital[];
    componenteDigitalListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this.componenteDigitalList = [];
        this.componenteDigitalListIsLoading = false;

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
                            'fileName': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.componenteDigitalListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            'fileName': `like:${value}%`
                        };
                        return this._componenteDigitalService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.componenteDigitalListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.componenteDigitalList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayComponenteDigitalFn(componenteDigital): string {
        return componenteDigital ? componenteDigital.fileName : null;
    }
}
