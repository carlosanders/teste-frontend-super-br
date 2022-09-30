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
import {Pagination, VinculacaoUsuario} from '@cdk/models';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {VinculacaoPessoaUsuarioService} from '../../../services/vinculacao-pessoa-usuario.service';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-vinculacao-pessoa-usuario-autocomplete',
    templateUrl: './cdk-vinculacao-pessoa-usuario-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-usuario-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'vinculacaoPessoaUsuarioAutocomplete',
})
export class CdkVinculacaoPessoaUsuarioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    vinculacaoPessoaUsuarioList: VinculacaoUsuario[];

    vinculacaoPessoaUsuarioListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoPessoaUsuarioService: VinculacaoPessoaUsuarioService
    ) {
        this.vinculacaoPessoaUsuarioList = [];
        this.vinculacaoPessoaUsuarioListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.vinculacaoPessoaUsuarioList = [];
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
                            'usuario.nome': `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.vinculacaoPessoaUsuarioListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._vinculacaoPessoaUsuarioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoPessoaUsuarioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.vinculacaoPessoaUsuarioList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoPessoaUsuarioFn(vinculacaoPessoaUsuario): string {
        return vinculacaoPessoaUsuario ? TitleCasePipe.format(vinculacaoPessoaUsuario.usuario.nome) : null;
    }
}
