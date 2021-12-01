import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination, Usuario} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-usuario-form',
    templateUrl: './cdk-usuario-form.component.html',
    styleUrls: ['./cdk-usuario-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUsuarioFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    usuario: Usuario;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    form: FormGroup;

    @Input()
    usuarioExterno = false;

    @Input()
    usuarioPagination: Pagination;

    @Output()
    save = new EventEmitter<any>();

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() abort = new EventEmitter<any>();

    @Output()
    usuarioCarregado = new EventEmitter<any>();

    activeCard = 'form';

    isCarregadoAutocomplete = false;

    isCpfValido = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public _loginService: LoginService,
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            username: [null],
            nome: [null, [Validators.required, Validators.maxLength(255), Validators.minLength(3)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
            nivelAcesso: [0, [Validators.required, Validators.maxLength(2), Validators.max(4), Validators.min(0)]],
            enabled: [true],
            validado: [false],
        });

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.context = {
            'filtrarPor': 'username'
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On Init
     */
    ngOnInit(): void {
        this.form.get('username').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.checkUsuario(value);
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['usuario'] && this.usuario && ((!this.usuario.id && !this.form.dirty) || (this.usuario.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.usuario.id,
                username: this.usuario.username,
                nome: this.usuario.nome,
                email: this.usuario.email,
                nivelAcesso: this.usuario.nivelAcesso,
                enabled: this.usuario.enabled,
                validado: this.usuario.validado
            });
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({formError: data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({rulesError: this.errors.error.message});
            }
        }

        if (!this.errors) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        localStorage.removeItem('filtrarPor');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    checkUsuario(value): void {
        if (value) {
            if (typeof value === 'string' && !this.usuario) {
                this.isCpfValido = value.trim().length === 11;
                if (this.isCpfValido) {
                    this.usuario = new Usuario();
                    this.usuario.username = value.trim();
                    this.usuario.enabled = true;
                    this.usuario.nivelAcesso = 0;
                    this.carregarForm(this.usuario);
                    this._changeDetectorRef.markForCheck();
                }
            }
            if (typeof value === 'object')
            {
                this.usuarioCarregado.emit(value);
                this.carregarForm(value);
                this.isCpfValido = true;
                this._changeDetectorRef.markForCheck();
                this.isCarregadoAutocomplete = typeof value === 'object' ?? true;
            }
        }
    }

    selectUsuario(usuario: Usuario): void {
        if (usuario) {
            this.form.get('username').setValue(usuario);
            this.carregarForm(usuario);
        }
        this.activeCard = 'form';
    }

    carregarForm(usuario: Usuario): void {
        if (usuario) {
            this.form.patchValue({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                nivelAcesso: usuario.nivelAcesso,
                enabled: usuario.enabled,
                validado: usuario.validado
            });
        }
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    usuarioAutocompleteLoading(isCarregandoAutocomplete: boolean): void {
        this.isCarregadoAutocomplete = !isCarregandoAutocomplete;
    }
}

