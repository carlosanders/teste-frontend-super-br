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
import {Pagination, VinculacaoEtiqueta} from '@cdk/models';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-vinculacao-etiqueta-autocomplete',
    templateUrl: './cdk-vinculacao-etiqueta-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'vinculacaoEtiquetaAutocomplete',
})
export class CdkVinculacaoEtiquetaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    vinculacaoEtiquetaList: VinculacaoEtiqueta[];

    vinculacaoEtiquetaListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService
    ) {
        this.vinculacaoEtiquetaList = [];
        this.vinculacaoEtiquetaListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.vinculacaoEtiquetaList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        andxFilter.push({
                            'etiqueta.nome': `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.vinculacaoEtiquetaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        let filterParam;
                        if (Array.isArray(this.pagination.filter)) {
                            const arrayFilterParam = [
                                ...this.pagination.filter,
                                andxFilter
                            ];
                            filterParam = JSON.stringify(arrayFilterParam);
                        } else {
                            const objectFilterParam = {
                                ...this.pagination.filter,
                                andX: andxFilter
                            };
                            filterParam = JSON.stringify(objectFilterParam);
                        }
                        return this._vinculacaoEtiquetaService.query(
                            filterParam,
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoEtiquetaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.vinculacaoEtiquetaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoEtiquetaFn(vinculacaoEtiqueta): string {
        return vinculacaoEtiqueta ? TitleCasePipe.format(vinculacaoEtiqueta.etiqueta.nome) : null;
    }
}
