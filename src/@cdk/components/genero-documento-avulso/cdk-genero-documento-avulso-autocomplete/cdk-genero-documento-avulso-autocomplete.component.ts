import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {GeneroDocumentoAvulso} from '@cdk/models/genero-documento-avulso.model';
import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-genero-documento-avulso-autocomplete',
    templateUrl: './cdk-genero-documento-avulso-autocomplete.component.html',
    styleUrls: ['./cdk-genero-documento-avulso-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'generoDocumentoAvulsoAutocomplete',
})
export class CdkGeneroDocumentoAvulsoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    generoDocumentoAvulsoList: GeneroDocumentoAvulso[];
    generoDocumentoAvulsoListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoDocumentoAvulsoService: GeneroDocumentoAvulsoService
    ) {
        this.generoDocumentoAvulsoList = [];
        this.generoDocumentoAvulsoListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    let termFilter = {};
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilter = {
                            ...termFilter,
                            'nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.generoDocumentoAvulsoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
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
        ).subscribe(response => {
            this.generoDocumentoAvulsoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayGeneroDocumentoAvulsoFn(generoDocumentoAvulso): string {
        return generoDocumentoAvulso ? generoDocumentoAvulso.nome : null;
    }
}
