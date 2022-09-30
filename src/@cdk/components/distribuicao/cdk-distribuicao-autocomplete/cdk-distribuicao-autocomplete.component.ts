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
import {Distribuicao, Pagination} from '@cdk/models';
import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-distribuicao-autocomplete',
    templateUrl: './cdk-distribuicao-autocomplete.component.html',
    styleUrls: ['./cdk-distribuicao-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'distribuicaoAutocomplete',
})
export class CdkDistribuicaoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    distribuicaoList: Distribuicao[];

    distribuicaoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _distribuicaoService: DistribuicaoService
    ) {
        this.distribuicaoList = [];
        this.distribuicaoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.distribuicaoList = [];
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
                            'tarefa.especieTarefa.nome': `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.distribuicaoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._distribuicaoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.distribuicaoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.distribuicaoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayDistribuicaoFn(distribuicao): string {
        return distribuicao ? TitleCasePipe.format(distribuicao.tarefa.especieTarefa.nome) : null;
    }
}
