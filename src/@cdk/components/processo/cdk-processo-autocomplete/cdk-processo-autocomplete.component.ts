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
import {Pagination, Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Filter} from './cdk-processo-autocomplete-filter/filters/filter';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-processo-autocomplete',
    templateUrl: './cdk-processo-autocomplete.component.html',
    styleUrls: ['./cdk-processo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'processoAutocomplete',
})
export class CdkProcessoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    field = 'NUP';

    @Input()
    filter: Filter;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    processoList: Processo[];
    processoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _processoService: ProcessoService
    ) {
        this.processoList = [];
        this.processoListIsLoading = false;
        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.processoList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 4),
            switchMap((value) => {
                let criteria = {};
                let field = this.filter?.field || 'NUP';
                let keyword = value.replace(/\D/g, '');

                if (this.filter?.field == 'outroNumero') {
                    keyword = value;
                }

                criteria[field] = `like:${keyword}%`;

                if (typeof value === 'string') {
                    const filters = {
                        ...this.pagination.filter,
                        andX: [criteria]
                    };
                    this.processoListIsLoading = true;
                    this._changeDetectorRef.detectChanges();
                    return this._processoService.query(
                        JSON.stringify(filters),
                        this.pagination.limit,
                        this.pagination.offset,
                        JSON.stringify(this.pagination.sort),
                        JSON.stringify(this.pagination.populate),
                        JSON.stringify(this.pagination.context))
                        .pipe(
                            finalize(() => this.processoListIsLoading = false),
                            catchError(() => of([]))
                        );
                }

                return of([]);
            })
        ).subscribe((response) => {
            this.processoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayProcessoFn(processo): string {
        let displayed = processo ? processo.NUP : '';
        displayed += (processo?.especieProcesso?.generoProcesso) ? (' (' + TitleCasePipe.format(processo.especieProcesso.generoProcesso.nome) + ')') : '';
        return displayed;
    }

    displayProcessoOutroNumeroFn(processo): string {
        return processo ? processo.outroNumero : '';
    }
}
