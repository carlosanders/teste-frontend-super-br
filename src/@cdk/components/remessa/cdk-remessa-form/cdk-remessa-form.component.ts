import {
    AfterViewInit,
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
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination, Pessoa, Processo, Setor, Tramitacao} from '@cdk/models';
import {DynamicService} from '../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../modules/modules-config';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {CdkConfigService} from "../../../services/config.service";

@Component({
    selector: 'cdk-remessa-form',
    templateUrl: './cdk-remessa-form.component.html',
    styleUrls: ['./cdk-remessa-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRemessaFormComponent implements OnChanges, OnDestroy, OnInit, AfterViewInit {

    @Input()
    tramitacao: Tramitacao;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    valid = true;

    @Input()
    mode = 'regular';

    @Output()
    save = new EventEmitter<Tramitacao>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    @Input()
    setorOrigemPaginationTree: Pagination;

    @Input()
    setorDestinoPagination: Pagination;

    setorOrigemListIsLoading: boolean;

    @Input()
    pessoaDestinoPagination: Pagination;

    @Output()
    gerirPessoaDestino = new EventEmitter();

    @Output()
    editPessoaDestino = new EventEmitter<number>();

    @Input()
    pessoaDestino: Pessoa;

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;

    @Input()
    processos: Processo[] = [];

    extensoes: any[] = [];

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dynamicService: DynamicService,
        public _cdkConfigService: CdkConfigService,
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            externa: [null],
            processos: [null],
            processo: [null],
            mecanismoRemessa: ['manual'],
            urgente: [null],
            setorOrigem: [null, [Validators.required]],
            pessoaDestino: [null, [Validators.required]],
            observacao: [null]
        });

        this.processoPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPaginationTree = new Pagination();
        this.pessoaDestinoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('mecanismoRemessa').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.form.get('pessoaDestino').reset();
                    this.form.get('pessoaDestino').enable();
                    this.pessoaDestinoPagination.filter = {};
                    if(value === 'barramento') {
                        this.pessoaDestinoPagination.filter['vinculacaoPessoaBarramento'] = 'isNotNull';
                    }
                    this._changeDetectorRef.detectChanges();
                    return of([]);
                }
            )
        ).subscribe();
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/remessa/cdk-remessa-form/cdk-remessa-form#radio';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.extensoes.push(1);
                            this._changeDetectorRef.markForCheck();
                            this.container.createComponent(componentFactory);
                        });
                }));
            }
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['tramitacao'] && this.tramitacao && ((!this.tramitacao.id && !this.form.dirty) || (this.tramitacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tramitacao});
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

        if (changes['pessoaDestino'] && this.pessoaDestino) {
            this.form.get('pessoaDestino').setValue(this.pessoaDestino);
        }

        this._changeDetectorRef.markForCheck();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.extensoes = [];
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

    checkProcesso(): void {
        const value = this.form.get('processo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processo').setValue(processo);
        }
        this.activeCard = 'form';
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
    }

    showPessoaDestinoGrid(): void {
        this.activeCard = 'pessoa-gridsearch';
    }

    showSetorOrigemTree(): void {
        this.activeCard = 'setor-origem-tree';
    }

    selectSetorOrigem(setor: Setor): void {
        if (setor) {
            this.form.get('setorOrigem').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkPessoaDestino(): void {
        const value = this.form.get('pessoaDestino').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pessoaDestino').setValue(null);
        }
    }

    selectPessoaDestino(pessoaDestino: Pessoa): void {
        if (pessoaDestino) {
            this.form.get('pessoaDestino').setValue(pessoaDestino);
        }
        this.activeCard = 'form';
    }

    doGerirPessoaDestino(): void {
        this.gerirPessoaDestino.emit();
    }

    doEditPessoaDestino(): void {
        this.editPessoaDestino.emit(this.form.get('pessoaDestino').value.id);
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
