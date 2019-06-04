import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {VinculacaoRepositorio} from '@cdk/models/vinculacao-repositorio.model';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-vinculacao-repositorio-autocomplete',
    templateUrl: './cdk-vinculacao-repositorio-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-repositorio-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'vinculacaoRepositorioAutocomplete',
})
export class CdkVinculacaoRepositorioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    vinculacaoRepositorioList: VinculacaoRepositorio[];
    vinculacaoRepositorioListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoRepositorioService: VinculacaoRepositorioService
    ) {
        this.vinculacaoRepositorioList = [];
        this.vinculacaoRepositorioListIsLoading = false;

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
                        this.vinculacaoRepositorioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            'modelo.nome': `like:${value}%`
                        };
                        return this._vinculacaoRepositorioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoRepositorioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.vinculacaoRepositorioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoRepositorioFn(vinculacaoRepositorio): string {
        return vinculacaoRepositorio ? vinculacaoRepositorio.modelo.nome : null;
    }
}
