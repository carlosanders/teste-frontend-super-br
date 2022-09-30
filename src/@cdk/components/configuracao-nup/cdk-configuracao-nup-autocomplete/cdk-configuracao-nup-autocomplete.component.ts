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
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {ConfiguracaoNup, Pagination} from '../../../models';
import {ConfiguracaoNupService} from '../../../services/configuracao-nup.service';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

// @ts-ignore
@Component({
    selector: 'cdk-configuracao-nup-autocomplete',
    templateUrl: './cdk-configuracao-nup-autocomplete.component.html',
    styleUrls: ['./cdk-configuracao-nup-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'configuracaoNupAutocomplete',
})
export class CdkConfiguracaoNupAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    configuracaoNupList: ConfiguracaoNup[];

    @Input()
    configuracaoNupListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _configuracaoNupService: ConfiguracaoNupService
    ) {
        this.configuracaoNupList = [];
        this.configuracaoNupListIsLoading = false;
        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.configuracaoNupList = [];
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
                        this.configuracaoNupListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._configuracaoNupService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.configuracaoNupListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.configuracaoNupList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayConfiguracaoNupFn(configuracaoNup): string {
        return configuracaoNup ? TitleCasePipe.format(configuracaoNup.nome) : '';
    }
}
