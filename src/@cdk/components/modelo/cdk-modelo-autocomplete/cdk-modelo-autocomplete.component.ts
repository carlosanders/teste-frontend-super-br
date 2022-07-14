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
import {Modelo, Pagination} from '@cdk/models';
import {ModeloService} from '@cdk/services/modelo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-modelo-autocomplete',
    templateUrl: './cdk-modelo-autocomplete.component.html',
    styleUrls: ['./cdk-modelo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modeloAutocomplete',
})
export class CdkModeloAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    modeloList: Modelo[];

    @Input()
    modeloListIsLoading: boolean;

    @Input()
    andxFilter: any;

    @Input()
    mode = 'search';

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modeloService: ModeloService
    ) {
        this.modeloList = [];
        this.modeloListIsLoading = false;

        this.pagination = new Pagination();
        this.andxFilter = [];
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modeloList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [...this.andxFilter];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        if (isNaN(bit)) {
                            andxFilter.push(
                                {
                                   nome: `like:%${bit}%`
                                }
                            );
                        } else {
                            andxFilter.push(
                                {
                                    id: `eq:${bit}`
                                }
                            );
                        }
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.modeloListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            andX: andxFilter,
                            ...this.pagination.filter
                        };
                        return this._modeloService[`${this.mode}`](
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modeloListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modeloList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModeloFn(modelo): string {
        return modelo ? TitleCasePipe.format(modelo.nome) : null;
    }
}
