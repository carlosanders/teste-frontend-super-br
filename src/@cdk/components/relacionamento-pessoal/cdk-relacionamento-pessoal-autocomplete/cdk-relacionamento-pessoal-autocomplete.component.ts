import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {RelacionamentoPessoal} from '@cdk/models';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-relacionamento-pessoal-autocomplete',
    templateUrl: './cdk-relacionamento-pessoal-autocomplete.component.html',
    styleUrls: ['./cdk-relacionamento-pessoal-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'relacionamentoPessoalAutocomplete',
})
export class CdkRelacionamentoPessoalAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    relacionamentoPessoalList: RelacionamentoPessoal[];
    relacionamentoPessoalListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _relacionamentoPessoalService: RelacionamentoPessoalService
    ) {
        this.relacionamentoPessoalList = [];
        this.relacionamentoPessoalListIsLoading = false;

        this.pagination = new Pagination();
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
                            servico: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.relacionamentoPessoalListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._relacionamentoPessoalService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.relacionamentoPessoalListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.relacionamentoPessoalList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayRelacionamentoPessoalFn(relacionamentoPessoal): string {
        return relacionamentoPessoal ? relacionamentoPessoal.nome : null;
    }
}
