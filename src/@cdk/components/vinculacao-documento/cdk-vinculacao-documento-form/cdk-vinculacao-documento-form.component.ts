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
import {
    Documento,
    ModalidadeVinculacaoDocumento,
    Pagination,
    Processo,
    VinculacaoDocumento
} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-vinculacao-documento-form',
    templateUrl: './cdk-vinculacao-documento-form.component.html',
    styleUrls: ['./cdk-vinculacao-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoDocumentoFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    vinculacaoDocumento: VinculacaoDocumento;

    @Input()
    processo: Processo;

    @Input()
    documentoVinculado: Documento;

    @Input()
    displayedColumns = ['id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome', 'componentesDigitais.extensao', 'actions'];

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoDocumento>();

    @Input()
    documentoPagination: Pagination;

    @Input()
    documentoVinculadoPagination: Pagination;

    @Input()
    modalidadeVinculacaoDocumentoPagination: Pagination;

    @Output()
    changeDocumentoVinculado = new EventEmitter<number>();

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() abort = new EventEmitter<any>();

    form: FormGroup;

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
            documento: [null, [Validators.required]],
            documentoVinculado: [null, [Validators.required]],
            modalidadeVinculacaoDocumento: [null, [Validators.required]]
        });

        this.documentoPagination = new Pagination();
        this.documentoPagination.filter = {
            'juntadaAtual': 'isNotNull',
            'juntadaAtual.ativo': 'eq:1',
            'vinculacoesDocumentos.id': 'isNull',
            'vinculacaoDocumentoPrincipal.id': 'isNull'
        };
        this.documentoPagination.populate = ['tipoDocumento', 'tipoDocumento.especieDocumento', 'juntadaAtual'];
        this.documentoVinculadoPagination = new Pagination();
        this.documentoVinculadoPagination.filter = {
            'juntadaAtual': 'isNotNull',
            'juntadaAtual.ativo': 'eq:1',
            'vinculacoesDocumentos.id': 'isNull',
            'vinculacaoDocumentoPrincipal.id': 'isNull'
        };
        this.documentoVinculadoPagination.populate = ['tipoDocumento', 'tipoDocumento.especieDocumento', 'juntadaAtual'];
        this.modalidadeVinculacaoDocumentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('documento').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                if (value && typeof value === 'object') {
                    this.form.get('documentoVinculado').reset();
                    this.documentoVinculadoPagination.filter = {
                        'juntadaAtual': 'isNotNull',
                        'id': 'neq:' + value.id,
                        'juntadaAtual.ativo': 'eq:1',
                        'vinculacoesDocumentos.id': 'isNull',
                        'vinculacaoDocumentoPrincipal.id': 'isNull',
                        'juntadaAtual.volume.processo.id': 'eq:' + this.processo.id
                    };
                    this._changeDetectorRef.markForCheck();
                }
                return of([]);
            })
        ).subscribe();
        this.form.get('documentoVinculado').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                if (value && typeof value === 'object') {
                    this.changeDocumentoVinculado.emit(value.id);
                }
                return of([]);
            })
        ).subscribe();

        this.form.setErrors({rulesError: ''});
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['vinculacaoDocumento'] && this.vinculacaoDocumento && (this.vinculacaoDocumento.documento?.id !== this.form.get('documento').value?.id)) {
            this.form.patchValue({...this.vinculacaoDocumento});
            this.activeCard = 'form';
            this._changeDetectorRef.detectChanges();
        }

        if (changes['documentoVinculado'] && this.documentoVinculado && (this.documentoVinculado.id !== this.form.get('documentoVinculado').value?.id)) {
            this.form.get('documentoVinculado').setValue(this.documentoVinculado);
            this.activeCard = 'form';
            this._changeDetectorRef.detectChanges();
        }
        if (changes['processo']) {
            this.documentoPagination.filter = {
                'juntadaAtual': 'isNotNull',
                'juntadaAtual.ativo': 'eq:1',
                'vinculacoesDocumentos.id': 'isNull',
                'vinculacaoDocumentoPrincipal.id': 'isNull',
                'juntadaAtual.volume.processo.id': 'eq:' + this.processo.id
            };
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

    checkDocumentoVinculado(): void {
        const value = this.form.get('documentoVinculado').value;
        if (!value || typeof value !== 'object') {
            this.form.get('documentoVinculado').setValue(null);
        }
    }

    selectDocumentoVinculado(documentoVinculado: Documento): void {
        if (documentoVinculado) {
            this.form.get('documentoVinculado').setValue(documentoVinculado);
        }
        this.activeCard = 'form';
    }

    showDocumentoVinculadoGrid(): void {
        this.activeCard = 'documento-vinculado-gridsearch';
    }

    checkModalidadeVinculacaoDocumento(): void {
        const value = this.form.get('modalidadeVinculacaoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeVinculacaoDocumento').setValue(null);
        }
    }

    selectModalidadeVinculacaoDocumento(modalidadeVinculacaoDocumento: ModalidadeVinculacaoDocumento): void {
        if (modalidadeVinculacaoDocumento) {
            this.form.get('modalidadeVinculacaoDocumento').setValue(modalidadeVinculacaoDocumento);
        }
        this.activeCard = 'form';
    }

    showModalidadeVinculacaoDocumentoGrid(): void {
        this.activeCard = 'modalidade-vinculacao-documento-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
