import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Setor} from '@cdk/models';
import {SetorService} from '@cdk/services/setor.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-setor-autocomplete',
    templateUrl: './cdk-setor-autocomplete.component.html',
    styleUrls: ['./cdk-setor-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'setorAutocomplete',
})
export class CdkSetorAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    setorList: Setor[];

    @Input()
    setorListIsLoading: boolean;

    @Input()
    extraFilter: string = '';

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _setorService: SetorService
    ) {
        this.setorList = [];
        this.setorListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const termFilterNome = [];
                    const termFilterSigla = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        const nomeKey = this.extraFilter ? this.extraFilter + '.nome' : 'nome';
                        const siglaKey = this.extraFilter ? this.extraFilter + '.sigla' : 'sigla';
                        let objNome = {};
                        objNome[nomeKey] = `like:%${bit}%`
                        termFilterNome.push(objNome);
                        let objSigla = {};
                        objSigla[siglaKey] = `like:%${bit}%`;
                        termFilterSigla.push(objSigla);
                    });
                    const termFilter = {
                        orX: [
                            {orX: termFilterNome},
                            {orX: termFilterSigla}
                        ]
                    };
                    if (typeof value === 'string' && (termFilterNome.length > 0 || termFilterSigla.length > 0)) {
                        this.setorListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._setorService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.setorListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.setorList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displaySetorFn(setor): string {
        let displayed = setor ? setor.nome : '';
        displayed += (setor && setor.unidade) ? (' (' + setor.unidade.sigla + ')') : '';
        return displayed;
    }
}
