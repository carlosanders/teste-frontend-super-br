import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {ServidorEmail} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-servidor-email-form',
    templateUrl: './cdk-servidor-email-form.component.html',
    styleUrls: ['./cdk-servidor-email-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkServidorEmailFormComponent implements OnChanges, OnDestroy {

    @Input()
    servidorEmail: ServidorEmail;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.loadForm();
    }

    loadForm(): void
    {
        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            host: [null, [Validators.required, Validators.maxLength(255)]],
            porta: [null, [Validators.required, Validators.min(0), Validators.maxLength(255)]],
            protocolo: [null, [Validators.required, Validators.maxLength(255)]],
            metodoEncriptacao: [null, [Validators.maxLength(255)]],
            validaCertificado: [null],
            login: [null],
            senha: [null],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void
    {
        if (changes['servidorEmail'] && this.servidorEmail && ((!this.servidorEmail.id && !this.form.dirty) || (this.servidorEmail.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.servidorEmail.id,
                nome: this.servidorEmail.nome,
                descricao: this.servidorEmail.descricao,
                host: this.servidorEmail.host,
                porta: this.servidorEmail.porta,
                protocolo: this.servidorEmail.protocolo,
                metodoEncriptacao: this.servidorEmail.metodoEncriptacao,
                validaCertificado: this.servidorEmail.validaCertificado,
                ativo: this.servidorEmail.ativo
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
    ngOnDestroy(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void
    {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    cancel(): void
    {
        this.activeCard = 'form';
    }

    doAbort(): void
    {
        this.abort.emit();
    }
}
