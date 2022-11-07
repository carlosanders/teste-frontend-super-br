import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Estado, Pagination} from '@cdk/models';
import {EstadoService} from '@cdk/services/estado.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-estado-autocomplete',
    templateUrl: './cdk-estado-autocomplete.component.html',
    styleUrls: ['./cdk-estado-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'estadoAutocomplete',
})
export class CdkEstadoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    estadoList: Estado[];

    estadoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _estadoService: EstadoService
    ) {
        this.estadoList = [];
        this.estadoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.estadoList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const filterNome = [];
                    const filterUf = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        filterNome.push({nome: `like:%${bit}%`});
                        filterUf.push({uf: `like:%${bit}%`});
                    });
                    const filter = {
                        orX: [
                            {andX: filterNome},
                            {andX: filterUf}
                        ]
                    };
                    if (typeof value === 'string' && (filterNome.length > 0 || filterUf.length > 0)) {
                        this.estadoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...filter
                        };
                        return this._estadoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.estadoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.estadoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEstadoFn(estado): string {
        return estado ? TitleCasePipe.format(estado.nome) + ` (${estado.uf})`: null;
    }
}
