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
import {ContaEmail, Pagination, ServidorEmail} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-conta-email-form',
    templateUrl: './cdk-conta-email-form.component.html',
    styleUrls: ['./cdk-conta-email-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkContaEmailFormComponent implements OnChanges, OnDestroy {

    @Input()
    contaEmail: ContaEmail;

    @Input()
    saving: boolean;

    @Input()
    servidorEmailPagination: Pagination = new Pagination();

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
            login: [null, [Validators.required, Validators.maxLength(255)]],
            senha: [null, [Validators.required, Validators.maxLength(255)]],
            metodoAutenticacao: [null, [Validators.maxLength(255)]],
            servidorEmail: [null, [Validators.required]],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void
    {
        if (changes['contaEmail'] && this.contaEmail && ((!this.contaEmail.id && !this.form.dirty) || (this.contaEmail.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.contaEmail.id,
                nome: this.contaEmail.nome,
                descricao: this.contaEmail.descricao,
                login: this.contaEmail.login,
                senha: this.contaEmail.senha,
                metodoAutenticacao: this.contaEmail.metodoAutenticacao,
                servidorEmail: this.contaEmail?.servidorEmail,
                ativo: this.contaEmail.ativo
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

    showServidorEmailGrid(): void {
        this.activeCard = 'servidor-email-gridsearch';
    }

    selectServidorEmail(servidorEmail: ServidorEmail): void {
        if (servidorEmail) {
            this.form.get('servidorEmail').setValue(servidorEmail);
        }
        this.activeCard = 'form';
    }

}
