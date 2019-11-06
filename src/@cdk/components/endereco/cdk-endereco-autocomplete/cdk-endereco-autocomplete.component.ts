import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Endereco} from '@cdk/models/endereco.model';
import {EnderecoService} from '@cdk/services/endereco.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-endereco-autocomplete',
    templateUrl: './cdk-endereco-autocomplete.component.html',
    styleUrls: ['./cdk-endereco-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'enderecoAutocomplete',
})
export class CdkEnderecoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    enderecoList: Endereco[];
    enderecoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _enderecoService: EnderecoService
    ) {
        this.enderecoList = [];
        this.enderecoListIsLoading = false;

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
                            logradouro: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.enderecoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._enderecoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.enderecoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.enderecoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEnderecoFn(endereco): string {
        return endereco ? endereco.logradouro : null;
    }
}
