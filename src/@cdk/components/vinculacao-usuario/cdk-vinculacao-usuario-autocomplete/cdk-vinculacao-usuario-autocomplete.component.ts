import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {VinculacaoUsuario} from '@cdk/models/vinculacao-usuario.model';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-vinculacao-usuario-autocomplete',
    templateUrl: './cdk-vinculacao-usuario-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-usuario-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'vinculacaoUsuarioAutocomplete',
})
export class CdkVinculacaoUsuarioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    vinculacaoUsuarioList: VinculacaoUsuario[];
    vinculacaoUsuarioListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoUsuarioService: VinculacaoUsuarioService
    ) {
        this.vinculacaoUsuarioList = [];
        this.vinculacaoUsuarioListIsLoading = false;

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
                            'usuario.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.vinculacaoUsuarioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._vinculacaoUsuarioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoUsuarioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.vinculacaoUsuarioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoUsuarioFn(vinculacaoUsuario): string {
        return vinculacaoUsuario ? vinculacaoUsuario.usuario.nome : null;
    }
}
