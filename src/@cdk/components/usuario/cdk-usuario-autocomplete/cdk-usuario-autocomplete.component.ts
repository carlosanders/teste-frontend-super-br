import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Pagination, Usuario} from '@cdk/models';
import {UsuarioService} from '@cdk/services/usuario.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';

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

    @Output()
    usuarioListIsLoadingEmit = new EventEmitter<any>();

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    filtrarPor: string;

    temDistribuidor = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _usuarioService: UsuarioService
    ) {
        this.usuarioList = [];
        this.usuarioListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.usuarioList = [];
        }
    }

    ngOnInit(): void {
        this.filtrarPor = localStorage.getItem('filtrarPor');
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        if (this.filtrarPor && this.filtrarPor === 'username') {
                            this.pagination.populate = ['populateAll', 'colaborador', 'colaborador.cargo', 'colaborador.modalidadeColaborador'];
                            andxFilter.push({
                                username: `like:%${bit}%`
                            });
                        } else {
                            andxFilter.push({
                                nome: `like:%${bit}%`
                            });
                        }
                    });
                    if (typeof value === 'string') {
                        this.usuarioListIsLoading = true;
                        this.usuarioListIsLoadingEmit.emit(this.usuarioListIsLoading);
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };

                        return this._usuarioService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate),
                            JSON.stringify(this.pagination['context']))
                            .pipe(
                                finalize(() => {
                                    this.usuarioListIsLoading = false;
                                    this.usuarioListIsLoadingEmit.emit(this.usuarioListIsLoading);
                                }),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.usuarioList = response['entities'];
            if (this.pagination['context'] &&
                (this.pagination['context'].setorApenasDistribuidor || this.pagination['context'].semAfastamento) ) {
                this.temDistribuidor = true;
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    displayUsuarioFn(usuario: Usuario): string {
        this.filtrarPor = localStorage.getItem('filtrarPor');
        if (this.filtrarPor && this.filtrarPor === 'username') {
            if (usuario) {
                if (usuario.username) {
                    return usuario.username;
                } else {
                    return usuario.toString();
                }
            } else {
                return null;
            }
        } else {
            return usuario ? usuario.nome + ' (' + usuario.username + ')' : null;
        }
    }
}
