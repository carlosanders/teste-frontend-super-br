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
import {Pagination, TipoSigilo} from '@cdk/models';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';

@Component({
    selector: 'cdk-tipo-sigilo-autocomplete',
    templateUrl: './cdk-tipo-sigilo-autocomplete.component.html',
    styleUrls: ['./cdk-tipo-sigilo-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'tipoSigiloAutocomplete',
})
export class CdkTipoSigiloAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    tipoSigiloList: TipoSigilo[];
    tipoSigiloListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoSigiloService: TipoSigiloService
    ) {
        this.tipoSigiloList = [];
        this.tipoSigiloListIsLoading = false;

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
                            nome: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.tipoSigiloListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._tipoSigiloService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.tipoSigiloListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.tipoSigiloList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayTipoSigiloFn(tipoSigilo): string {
        return tipoSigilo ? tipoSigilo.nome : null;
    }
}
