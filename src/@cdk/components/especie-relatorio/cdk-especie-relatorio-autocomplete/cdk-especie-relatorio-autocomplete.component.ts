import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieTarefa} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {EspecieRelatorio} from '@cdk/models/especie-relatorio.model';
import {EspecieRelatorioService} from '../../../services/especie-relatorio.service';


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
    control: FormControl;

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
                        this.especieRelatorioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
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
        ).subscribe(response => {
            this.especieRelatorioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieTarefaFn(especieTarefa): string {
        let displayed = especieTarefa ? especieTarefa.nome : '';
        displayed += (especieTarefa && especieTarefa.generoTarefa) ? (' (' + especieTarefa.generoTarefa.nome + ')') : '';
        return displayed;
    }
}
