import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input, OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Pagination, TipoDocumento} from '@cdk/models';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-tipo-documento-autocomplete',
    templateUrl: './cdk-tipo-documento-autocomplete.component.html',
    styleUrls: ['./cdk-tipo-documento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'tipoDocumentoAutocomplete',
})
export class CdkTipoDocumentoAutocompleteComponent implements OnInit, OnDestroy {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    tipoDocumentoList: TipoDocumento[];

    tipoDocumentoListIsLoading: boolean;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoDocumentoService: TipoDocumentoService
    ) {
        this.tipoDocumentoList = [];
        this.tipoDocumentoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.tipoDocumentoList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'string') {
                        if (value.length >= 2) {
                            const andxFilter = [];
                            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                                andxFilter.push({
                                    nome: `like:%${bit}%`
                                });
                            });
                            if (andxFilter.length > 0) {
                                this.tipoDocumentoListIsLoading = true;
                                this._changeDetectorRef.detectChanges();
                                const filterParam = {
                                    ...this.pagination.filter,
                                    andX: andxFilter
                                };
                                return this._tipoDocumentoService.query(
                                    JSON.stringify(filterParam),
                                    this.pagination.limit,
                                    this.pagination.offset,
                                    JSON.stringify(this.pagination.sort),
                                    JSON.stringify(this.pagination.populate))
                                    .pipe(
                                        finalize(() => this.tipoDocumentoListIsLoading = false),
                                        catchError(() => of([]))
                                    );
                            }
                        }
                    }
                    this.tipoDocumentoList = [];
                    return of([]);
                }
            )
        ).subscribe((response) => {
            this.tipoDocumentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    displayTipoDocumentoFn(tipoDocumento): string {
        return tipoDocumento ? TitleCasePipe.format(tipoDocumento.nome) : null;
    }
}
