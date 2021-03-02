import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {Pagination, Usuario} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-tipo-validacao-atr-para',
    templateUrl: './cdk-tipo-validacao-atr-para.component.html',
    styleUrls: ['./cdk-tipo-validacao-atr-para.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoValidacaoAtrParaComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    validacao: ValidacaoTransicaoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<ValidacaoTransicaoWorkflow>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    @Input()
  
    @Input()
    usuarioRecebidoPagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

  
    
    activeCard = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            transicaoWorkflow: [null],
            contexto: [null],
            atribuidoPara: [null, [Validators.required]],
            nome: ["nome", [Validators.required]],
            descricao: ["descricao", [Validators.required]],
        });

        
        this.usuarioRecebidoPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnInit(): void {

    }

    /**
     * On change
     */

   
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['validacao'] && this.validacao && ((!this.validacao.id && !this.form.dirty) || (this.validacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.validacao});
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
            Object.keys(this.form.controls).forEach(key => {
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

    checkUsuarioRecebido(): void {
        const value = this.form.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuario').setValue(null);
        }
    }

    showUsuarioRecebidoGrid(): void {
        this.activeCard = 'usuario-recebido-gridsearch';
    }

    selectUsuarioRecebido(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuario').setValue(usuario);
        }
        this.activeCard = 'form';
    }


    cancel(): void {
        this.activeCard = 'form';
    }

}