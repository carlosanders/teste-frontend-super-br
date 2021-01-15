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
import {Pagination, Modelo, TipoDocumento, Setor, Usuario} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-validacao-transicao-workflow-form',
    templateUrl: './cdk-validacao-transicao-workflow-form.component.html',
    styleUrls: ['./cdk-validacao-transicao-workflow-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkValidacaoTransicaoWorkflowFormComponent implements OnInit, OnChanges, OnDestroy {

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
    modeloPagination: Pagination;

    @Input()
    tipoDocumentoPagination: Pagination;

    @Input()
    setorRecebidoPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    @Input()
    unidadeRecebidoPagination: Pagination;

    @Input()
    usuarioRecebidoPagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

    selecionadoTipoDocumento: boolean = false; 
    selecionadoSetorOrigem: boolean = false;  
    selecionadoCriadoPor: boolean = false; 
    selecionadoAtribuidoPara: boolean = false; 
    selecionadoUnidade: boolean = false; 
    
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
            tipoDocumento: [null],
            setorOrigem: [null],
            usuario: [null],
            criadoPor:[null],
            atribuidoPara: [null],
            unidade: [null],
            nome: ["nome", [Validators.required]],
            descricao: ["descricao", [Validators.required]],
            valor: [null]
        });

        
        this.tipoDocumentoPagination = new Pagination();
        this.setorRecebidoPagination = new Pagination();
        this.setorRecebidoPagination.filter = {parent: 'isNotNull'};
        this.setorOrigemPagination = new Pagination();
        this.usuarioRecebidoPagination = new Pagination();
        this.unidadeRecebidoPagination = new Pagination();
        this.unidadeRecebidoPagination.filter = {parent: 'isNull'};
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

    escolheOpcaoRadioButton(valorRadioButton){
        if(valorRadioButton === 'selecionandoTipoDocumento'){
            this.selecionadoTipoDocumento = true; 

            this.selecionadoSetorOrigem = false;
            if(this.form.value.setorOrigem !== null){
                this.form.value.setorOrigem.nome = '';
                this.form.value.setorOrigem = null;  
            }
            
            this.selecionadoCriadoPor = false;
            if(this.form.value.criadoPor !== null){
                this.form.value.criadoPor.nome = '';
                this.form.value.criadoPor = null;   
            }

            this.selecionadoAtribuidoPara = false;
            if(this.form.value.atribuidoPara !== null){
                this.form.value.atribuidoPara.nome = '';
                this.form.value.atribuidoPara = null;   
            }
            
            this.selecionadoUnidade = false;
            if(this.form.value.unidade !== null){
                this.form.value.unidade.nome = '';
                this.form.value.unidade = null;   
            }
        }else if(valorRadioButton === 'selecionandoSetorOrigem'){
            this.selecionadoTipoDocumento = false;
            if(this.form.value.tipoDocumento !== null){
                this.form.value.tipoDocumento.nome = '';
                this.form.value.tipoDocumento = null;   
            }
            
            this.selecionadoSetorOrigem = true;  

            this.selecionadoCriadoPor = false;
            if(this.form.value.criadoPor !== null){
                this.form.value.criadoPor.nome = '';
                this.form.value.criadoPor = null;   
            } 

            this.selecionadoAtribuidoPara = false;
            if(this.form.value.atribuidoPara !== null){
                this.form.value.atribuidoPara.nome = '';
                this.form.value.atribuidoPara = null;   
            }
            
            this.selecionadoUnidade = false;
            if(this.form.value.unidade !== null){
                this.form.value.unidade.nome = '';
                this.form.value.unidade = null;   
            }

        }else if(valorRadioButton === 'selecionandoCriadoPor'){
            this.selecionadoTipoDocumento = false;
            if(this.form.value.tipoDocumento !== null){
                this.form.value.tipoDocumento.nome = '';
                this.form.value.tipoDocumento = null;   
            }
            this.selecionadoSetorOrigem = false;
            if(this.form.value.setorOrigem !== null){
                this.form.value.setorOrigem.nome = '';
                this.form.value.setorOrigem = null;  
            }
            
            this.selecionadoCriadoPor = true; 

            this.selecionadoAtribuidoPara = false;
            if(this.form.value.atribuidoPara !== null){
                this.form.value.atribuidoPara.nome = '';
                this.form.value.atribuidoPara = null;   
            }
            
            this.selecionadoUnidade = false;
            if(this.form.value.unidade !== null){
                this.form.value.unidade.nome = '';
                this.form.value.unidade = null;   
            }
        }else if(valorRadioButton === 'selecionandoAtribuidoPara'){
            this.selecionadoTipoDocumento = false;
            if(this.form.value.tipoDocumento !== null){
                this.form.value.tipoDocumento.nome = '';
                this.form.value.tipoDocumento = null;   
            }
            this.selecionadoSetorOrigem = false;
            if(this.form.value.setorOrigem !== null){
                this.form.value.setorOrigem.nome = '';
                this.form.value.setorOrigem = null;  
            }

            this.selecionadoCriadoPor = false;
            if(this.form.value.criadoPor !== null){
                this.form.value.criadoPor.nome = '';
                this.form.value.criadoPor = null;   
            } 


            this.selecionadoAtribuidoPara = true;

            this.selecionadoUnidade = false;
            if(this.form.value.unidade !== null){
                this.form.value.unidade.nome = '';
                this.form.value.unidade = null;   
            }
        }else{
            this.selecionadoTipoDocumento = false;
            if(this.form.value.tipoDocumento !== null){
                this.form.value.tipoDocumento.nome = '';
                this.form.value.tipoDocumento = null;   
            }

            this.selecionadoSetorOrigem = false;
            if(this.form.value.setorOrigem !== null){
                this.form.value.setorOrigem.nome = '';
                this.form.value.setorOrigem = null;  
            }
            
            this.selecionadoCriadoPor = false;
            if(this.form.value.criadoPor !== null){
                this.form.value.criadoPor.nome = '';
                this.form.value.criadoPor = null;   
            }

            this.selecionadoAtribuidoPara = false;
            if(this.form.value.atribuidoPara !== null){
                this.form.value.atribuidoPara.nome = '';
                this.form.value.atribuidoPara = null;   
            }
            
            this.selecionadoUnidade = true; 
        }
    } 
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

  
    checkUnidadeRecebido(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
            this.form.get('valor').setValue(null);
        }
    }

    showUnidadeRecebidoGrid(): void {
        this.activeCard = 'unidade-recebido-gridsearch';
    }

    selectUnidadeRecebido(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }


    checkUnidadeOrigem(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    showUnidadeOrigemGrid(): void {
        this.activeCard = 'unidade-origem-gridsearch';
    }

    selectUnidadeOrigem(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    checkUsuarioRecebido(): void {
        const value = this.form.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuario').setValue(null);
            this.form.get('valor').setValue(null);
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

    checkTipoDocumento(): void {
        
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoDocumento').setValue(null);
        }
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        

        if (tipoDocumento) {
            this.form.get('tipoDocumento').setValue(tipoDocumento);
        }
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        

        this.activeCard = 'tipo-documento-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    selectSetorOrigem(setorOrigem: Setor): void {
        this.form.get('setorOrigem').setValue(setorOrigem);
        this.activeCard = 'form';
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
