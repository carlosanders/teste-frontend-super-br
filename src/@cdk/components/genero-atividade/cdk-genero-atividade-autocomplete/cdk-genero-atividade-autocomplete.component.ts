import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {GeneroAtividade} from '@cdk/models/genero-atividade.model';
import {GeneroAtividadeService} from '@cdk/services/genero-atividade.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-genero-atividade-autocomplete',
    templateUrl: './cdk-genero-atividade-autocomplete.component.html',
    styleUrls: ['./cdk-genero-atividade-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'generoAtividadeAutocomplete',
})
export class CdkGeneroAtividadeAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    generoAtividadeList: GeneroAtividade[];
    generoAtividadeListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoAtividadeService: GeneroAtividadeService
    ) {
        this.generoAtividadeList = [];
        this.generoAtividadeListIsLoading = false;

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
                        this.generoAtividadeListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._generoAtividadeService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.generoAtividadeListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.generoAtividadeList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayGeneroAtividadeFn(generoAtividade): string {
        return generoAtividade ? generoAtividade.nome : null;
    }
}
