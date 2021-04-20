import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieProcesso} from '@cdk/models';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-especie-processo-autocomplete',
    templateUrl: './cdk-especie-processo-autocomplete.component.html',
    styleUrls: ['./cdk-especie-processo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'especieProcessoAutocomplete',
})
export class CdkEspecieProcessoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    especieProcessoList: EspecieProcesso[];

    @Input()
    especieProcessoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieProcessoService: EspecieProcessoService
    ) {
        this.especieProcessoList = [];
        this.especieProcessoListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        andxFilter.push({
                            nome: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.especieProcessoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._especieProcessoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.especieProcessoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.especieProcessoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEspecieProcessoFn(especieProcesso): string {
        let displayed = especieProcesso ? especieProcesso.nome : '';
        if(displayed === "ELABORAÇÃO DE ATO NORMATIVO"){
            displayed += (especieProcesso && especieProcesso.generoProcesso) ? (' (' + especieProcesso.generoProcesso.nome + ", WORKFLOW" +')') : '';
        }else{
            displayed += (especieProcesso && especieProcesso.generoProcesso) ? (' (' + especieProcesso.generoProcesso.nome + ')') : '';
        }
        return displayed;
    }
}
