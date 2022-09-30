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
import {Desentranhamento, Pagination} from '@cdk/models';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-desentranhamento-autocomplete',
    templateUrl: './cdk-desentranhamento-autocomplete.component.html',
    styleUrls: ['./cdk-desentranhamento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'desentranhamentoAutocomplete',
})
export class CdkDesentranhamentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    desentranhamentoList: Desentranhamento[];

    desentranhamentoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _desentranhamentoService: DesentranhamentoService
    ) {
        this.desentranhamentoList = [];
        this.desentranhamentoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.desentranhamentoList = [];
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
                            'juntada.descricao': `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.desentranhamentoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._desentranhamentoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.desentranhamentoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.desentranhamentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayDesentranhamentoFn(desentranhamento): string {
        return desentranhamento ? TitleCasePipe.format(desentranhamento.juntada.descricao) : null;
    }
}
