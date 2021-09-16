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
        if (!this.control.value || typeof this.control.value === 'string') {
            this.modeloList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const termFilterNome = [];
                    const termFilterId = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        const nomeKey = 'nome';
                        const idKey = 'id';
                        const objNome = {};
                        objNome[nomeKey] = `like:%${bit}%`;
                        termFilterNome.push(objNome);
                        const objId = {};
                        objId[idKey] = `eq:%${bit}%`;
                        termFilterId.push(objId);
                    });
                    const termFilter = {
                        orX: [
                            {orX: termFilterNome},
                            {orX: termFilterId}
                        ]
                    };
                    if (typeof value === 'string' && termFilterNome.length > 0 || termFilterId.length > 0) {
                        this.modeloListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._modeloService.search(
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
        return modelo ? modelo.nome : null;
    }
}
