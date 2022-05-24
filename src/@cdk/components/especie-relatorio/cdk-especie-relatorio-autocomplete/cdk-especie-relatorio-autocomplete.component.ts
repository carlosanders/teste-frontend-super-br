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
import {Pagination} from '@cdk/models';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {EspecieRelatorio} from '@cdk/models/especie-relatorio.model';
import {EspecieRelatorioService} from '../../../services/especie-relatorio.service';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-especie-relatorio-autocomplete',
    templateUrl: './cdk-especie-relatorio-autocomplete.component.html',
    styleUrls: ['./cdk-especie-relatorio-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'especieRelatorioAutocomplete',
})
export class CdkEspecieRelatorioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    especieRelatorioList: EspecieRelatorio[];

    @Input()
    especieRelatorioListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieRelatorioService: EspecieRelatorioService
    ) {
        this.especieRelatorioList = [];
        this.especieRelatorioListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.especieRelatorioList = [];
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
                            nome: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.especieRelatorioListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._especieRelatorioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.especieRelatorioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.especieRelatorioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieRelatorioFn(especieRelatorio): string {
        let displayed = especieRelatorio ? especieRelatorio.nome : '';
        displayed += (especieRelatorio && especieRelatorio.generoRelatorio) ? (' (' + especieRelatorio.generoRelatorio.nome + ')') : '';
        return TitleCasePipe.format(displayed);
    }
}
