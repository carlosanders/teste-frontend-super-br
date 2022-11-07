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
import {GeneroDocumentoAvulso, Pagination} from '@cdk/models';
import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-genero-documento-avulso-autocomplete',
    templateUrl: './cdk-genero-documento-avulso-autocomplete.component.html',
    styleUrls: ['./cdk-genero-documento-avulso-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'generoDocumentoAvulsoAutocomplete',
})
export class CdkGeneroDocumentoAvulsoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    generoDocumentoAvulsoList: GeneroDocumentoAvulso[];

    generoDocumentoAvulsoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoDocumentoAvulsoService: GeneroDocumentoAvulsoService
    ) {
        this.generoDocumentoAvulsoList = [];
        this.generoDocumentoAvulsoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.generoDocumentoAvulsoList = [];
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
                        this.generoDocumentoAvulsoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._generoDocumentoAvulsoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.generoDocumentoAvulsoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.generoDocumentoAvulsoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayGeneroDocumentoAvulsoFn(generoDocumentoAvulso): string {
        return generoDocumentoAvulso ? TitleCasePipe.format(generoDocumentoAvulso.nome) : null;
    }
}
