import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Usuario} from '@cdk/models';
import {UsuarioService} from '@cdk/services/usuario.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: ' cdk-usuario-autocomplete',
    templateUrl: './cdk-usuario-autocomplete.component.html',
    styleUrls: ['./cdk-usuario-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'usuarioAutocomplete',
})
export class CdkUsuarioAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    usuarioList: Usuario[];

    @Input()
    usuarioListIsLoading: boolean;

    @Input()
    filtrarPor: string = 'nome';

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _usuarioService: UsuarioService
    ) {
        this.usuarioList = [];
        this.usuarioListIsLoading = false;

        this.pagination = new Pagination();
        this.pagination.populate = ['colaborador', 'colaborador.cargo'];
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length > 1),
            switchMap((value) => {
                    console.log('filtrarPor', this.filtrarPor);
                    console.log('value', value);
                    let termFilter = {};
                    value.split(' ').filter(bit => !!bit && bit.length > 1).forEach(bit => {
                        if (this.filtrarPor === 'nome') {
                            termFilter = {
                                ...termFilter,
                                nome: `like:%${bit}%`
                            };
                        }
                        if (this.filtrarPor === 'username') {
                            termFilter = {
                                ...termFilter,
                                username: `like:%${bit}%`
                            };
                        }
                    });
                    if (typeof value === 'string') {
                        this.usuarioListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._usuarioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.usuarioListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.usuarioList = response['entities'];
            this._changeDetectorRef.markForCheck();
            console.log('this._changeDetectorRef', this._changeDetectorRef);
            console.log('this._changeDetectorRef', this._changeDetectorRef.markForCheck());
        });
    }

    displayUsuarioFn(usuario: Usuario): string {
        console.log('this.filtrarPor', this.filtrarPor, this.filtrarPor === 'username');
        if (this.filtrarPor === 'username')
            return usuario ? usuario.username : null;
        console.log('DEPOIS');
        return usuario ? usuario.nome : null;
    }
}
