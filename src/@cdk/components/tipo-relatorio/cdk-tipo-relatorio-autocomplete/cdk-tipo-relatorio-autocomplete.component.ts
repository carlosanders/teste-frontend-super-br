import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';

@Component({
    selector: 'cdk-tipo-relatorio-autocomplete',
    templateUrl: './cdk-tipo-relatorio-autocomplete.component.html',
    styleUrls: ['./cdk-tipo-relatorio-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'tipoRelatorioAutocomplete',
})
export class CdkTipoRelatorioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    tipoRelatorioList: TipoRelatorio[];

    @Input()
    tipoRelatorioListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoRelatorioService: TipoRelatorioService
    ) {
        this.tipoRelatorioList = [];
        this.tipoRelatorioListIsLoading = false;

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
                            nome: `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.tipoRelatorioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._tipoRelatorioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.tipoRelatorioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.tipoRelatorioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displaySetorFn(setor): string {
        let displayed = setor ? setor.nome : '';
        displayed += (setor && setor.unidade) ? (' (' + setor.unidade.sigla + ')') : '';
        return displayed;
    }
}
