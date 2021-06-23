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
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {modulesConfig} from '../../../../modules/modules-config';
import {Pagination, Setor, Tramitacao} from '../../../models';
import {DynamicService} from '../../../../modules/dynamic.service';

@Component({
    selector: 'cdk-recebimento-form',
    templateUrl: './cdk-recebimento-form.component.html',
    styleUrls: ['./cdk-recebimento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRecebimentoFormComponent implements OnChanges, OnDestroy {

    @Input()
    tramitacao: Tramitacao;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter();

    @Output()
    abort = new EventEmitter<any>();

    activeCard = 'form';

    form: FormGroup;

    setorAtualListIsLoading: boolean;

    @Input()
    setorAtualPagination: Pagination;

    @Input()
    setorAtualPaginationTree: Pagination;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dynamicService: DynamicService
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            setorAtual: [null, [Validators.required]]
        });

        this.setorAtualPagination = new Pagination();
        this.setorAtualPaginationTree = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

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
        this._changeDetectorRef.markForCheck();
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit(): void {
        const path = '@cdk/components/tramitacao/cdk-recebimento-form';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
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

    checkSetorAtual(): void {
        const value = this.form.get('setorAtual').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorAtual').setValue(null);
        }
    }

    showSetorAtualGrid(): void {
        this.activeCard = 'setor-destino-gridsearch';
    }

    showSetorAtualTree(): void {
        this.activeCard = 'setor-destino-tree';
    }

    selectSetorAtual(setor: Setor): void {
        if (setor) {
            this.form.get('setorAtual').setValue(setor);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
