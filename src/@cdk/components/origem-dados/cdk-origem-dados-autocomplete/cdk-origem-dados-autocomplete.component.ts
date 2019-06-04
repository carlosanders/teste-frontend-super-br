import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {OrigemDados} from '@cdk/models/origem-dados.model';
import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-origem-dados-autocomplete',
    templateUrl: './cdk-origem-dados-autocomplete.component.html',
    styleUrls: ['./cdk-origem-dados-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'origemDadosAutocomplete',
})
export class CdkOrigemDadosAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    origemDadosList: OrigemDados[];
    origemDadosListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _origemDadosService: OrigemDadosService
    ) {
        this.origemDadosList = [];
        this.origemDadosListIsLoading = false;

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
                            'servico': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.origemDadosListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            'servico': `like:${value}%`
                        };
                        return this._origemDadosService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.origemDadosListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.origemDadosList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayOrigemDadosFn(origemDados): string {
        return origemDados ? origemDados.nome : null;
    }
}
