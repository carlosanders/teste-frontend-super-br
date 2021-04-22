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

    processoList: Processo[];
    processoListIsLoading: boolean;

    @Input()
    field = 'NUP'

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _processoService: ProcessoService
    ) {
        this.processoList = [];
        this.processoListIsLoading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const termFilterNUP = [];
                    const termFilterOutroNumero = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilterNUP.push({
                            NUP: `like:%${bit.replace(/\D/g, '')}%`
                        });
                        termFilterOutroNumero.push({
                            outroNumero: `like:%${bit}%`
                        });
                    });
                    const termFilter = {
                        orX: [
                            {orX: termFilterNUP},
                            {orX: termFilterOutroNumero}
                        ]
                    };
                    if (typeof value === 'string' && (termFilterNUP.length > 0 || termFilterOutroNumero.length > 0)) {
                        this.processoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._processoService.search(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.processoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.processoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayProcessoFn(processo): string {
        let displayed = processo ? processo.NUP : '';
        displayed += (processo?.especieProcesso?.generoProcesso) ? (' (' + processo.especieProcesso.generoProcesso.nome + ')') : '';
        return displayed;
    }

    displayProcessoOutroNumeroFn(processo): string {
        return processo ? processo.outroNumero : '';
    }
}
