import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatChipInputEvent,
    MatDialog,
    MatDialogRef
} from '@cdk/angular/material';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta, Pagination, VinculacaoEtiqueta} from '@cdk/models';
import {CdkVinculacaoEtiquetaEditDialogComponent} from '../cdk-vinculacao-etiqueta-edit-dialog/cdk-vinculacao-etiqueta-edit-dialog.component';
import {CdkUtils} from '@cdk/utils';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';


@Component({
    selector: 'cdk-vinculacao-etiqueta-chips',
    templateUrl: './cdk-vinculacao-etiqueta-chips.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEtiquetaChipsComponent implements OnInit, OnChanges {

    visible = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    etiquetaCtrl = new FormControl();

    // é utlizada uma instância única para faciliar o fechamento do dialog através do método ngonchanges
    dialogRef: MatDialogRef<CdkVinculacaoEtiquetaEditDialogComponent, any>;

    @Input()
    savingVinculacaoEtiquetaId: number;

    @Input()
    placeholder: string;

    @Input()
    errors: any;

    @Input()
    errorsAddEtiqueta: any;

    @Input()
    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];

    @Input()
    habilitarOpcaoBtnAddEtiqueta = false;

    @Input()
    pagination: Pagination;

    @Input()
    valid = true;

    @Output()
    delete = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    edit = new EventEmitter<any>();

    @Output()
    create = new EventEmitter<Etiqueta>();

    @Output()
    addEtiqueta = new EventEmitter<Etiqueta>();

    @Output()
    pendencies: EventEmitter<VinculacaoEtiqueta> = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    filter = new EventEmitter<Etiqueta>();

    @Input()
    viewFilterEtiqueta = false;

    @ViewChild('etiquetaInput', {static: false}) etiquetaInput: ElementRef<HTMLInputElement>;
    @ViewChild('etiqueta', {static: false}) matAutocomplete: MatAutocomplete;

    @ViewChild('etiquetaInput', {static: false, read: MatAutocompleteTrigger})
    autoCompleteEtiquetas: MatAutocompleteTrigger;

    showBtnAddEtiqueta = false;

    etiqueta: Etiqueta = null;

    creating: boolean = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog,
    ) {
        this.pagination = new Pagination();
    }

    add(event: MatChipInputEvent): void {
        this.creating = false;
        // Add etiqueta only when MatAutocomplete is not open
        // To make sure this does not conflict with OptionSelected Event
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            // Add our etiqueta
            if ((value || '').trim()) {
                // this.vinculacoesEtiquetas.push(value.trim());
                // this.create.emit();
            }

            this.etiquetaCtrl.setValue(null);
        } else {
            this.autoCompleteEtiquetas.closePanel();
        }
    }

    doRemove(etiqueta:Etiqueta, vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.creating = false;
        this.autoCompleteEtiquetas.closePanel();
        const index = this.vinculacoesEtiquetas.indexOf(vinculacaoEtiqueta);

        if (index >= 0) {
            // this.vinculacoesEtiquetas.splice(index, 1);
        }

        this.delete.emit(vinculacaoEtiqueta);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.creating = false;
        this.create.emit(event.option.value);
        // this.vinculacoesEtiquetas.push(event.option.value);
        this.etiquetaInput.nativeElement.value = '';
        this.etiquetaCtrl.setValue(null);
    }

    ngOnInit(): void {}

    /**
     * On change
     */
    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

        if (changes['vinculacoesEtiquetas'] && this.vinculacoesEtiquetas) {
            this.vinculacoesEtiquetas = this.vinculacoesEtiquetas.filter(e => e.criadoEm );
        }

        // o trecho de código abaixo é apenas para situações em que um dialog de
        // alteração de conteúdo de vinculação de etiqueta foi aberto
        if (this.dialogRef) {
            if (this.errors && this.errors.status && this.errors.status === 422) {// 422) {
                try {
                    const data = JSON.parse(this.errors.error.message);
                    const fields = Object.keys(data || {});
                    fields.forEach((field) => {
                        const control = this.dialogRef.componentInstance.form.get(field);
                        control.setErrors({formError: data[field].join(' - ')});
                    });

                } catch (e) {
                    this.dialogRef.componentInstance.form.setErrors({rulesError: this.errors.error.message});
                } finally {
                    // o código abaixo foi colocado para que a mensagem de erro apareça
                    this.dialogRef.componentInstance.data.mostraSpinnerSalvamento = false;
                    this.dialogRef.componentInstance._changeDetectorRef.detectChanges();
                }
            }
            if (!this.errors) {
                Object.keys(this.dialogRef.componentInstance.form.controls).forEach((key) => {
                    this.dialogRef.componentInstance.form.get(key).setErrors(null);
                });
                this.dialogRef.componentInstance.form.setErrors(null);

                if (!this.savingVinculacaoEtiquetaId) {
                    this.dialogRef.componentInstance.dialogRef.close();
                }
            }
        }

        if (this.errorsAddEtiqueta && this.errorsAddEtiqueta.status && this.errorsAddEtiqueta.status === 422) {
            this.etiquetaCtrl.setErrors({
                addEtiqueta: CdkUtils.errorsToString(this.errorsAddEtiqueta)
            });
        }
        this._changeDetectorRef.markForCheck();
    }

    openMenu(event: any): void {
        if (event.scope.canOpenMenu() && event.scope.matMenuTrigger) {
            event.scope.matMenuTrigger.openMenu()
        }
    }

    openDialogEdit(etiqueta:Etiqueta, vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.creating = false;
        // abre o diálogo de edição do conteúdo da etiqueta caso ela não esteja com status de saving (nesse estado ela vai ser ready-only)
        if (this.savingVinculacaoEtiquetaId !== vinculacaoEtiqueta.id) {
            this.dialogRef = this.dialog.open(CdkVinculacaoEtiquetaEditDialogComponent, {
                data: {
                    vinculacaoEtiqueta: vinculacaoEtiqueta,
                    mostraSpinnerSalvamento: false,
                },
                width: '600px',
                height: '300px',
            });

            const sub = this.dialogRef.componentInstance.editVinc.subscribe((result) => {
                this.edit.emit(result);
                this.dialogRef.componentInstance.dialogRef.close();
            });

            this.dialogRef.afterClosed()
                .subscribe((result) => {
                    this.dialogRef = null;
                });
        }
    }

    doPendencies(etiqueta: Etiqueta, vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.pendencies.emit(vinculacaoEtiqueta);
    }

    newEtiqueta(): void {
        this.creating = false;
        this.etiquetaCtrl.setErrors(null);

        this.showBtnAddEtiqueta = false;

        if (this.etiquetaInput.nativeElement.value.length > 2) {
            this.etiqueta = new Etiqueta();
            this.etiqueta.nome = this.etiquetaInput.nativeElement.value;
            this.etiqueta.descricao = this.etiquetaInput.nativeElement.value;
            this.etiqueta.ativo = true;
            this.etiqueta.sistema = false;
            this.etiqueta.corHexadecimal = '#a9aab3';
            this.showBtnAddEtiqueta = true;
        }
    }

    limpaErros(): void {
        this.creating = false;
        this.etiquetaCtrl.setErrors(null);
    }

    sendEtiqueta(): void {
        this.autoCompleteEtiquetas.closePanel();
        this.etiquetaInput.nativeElement.value = '';
        this._changeDetectorRef.markForCheck();
        this.addEtiqueta.emit(this.etiqueta);
        this.creating = true;
        this.showBtnAddEtiqueta = false;
    }

    filtroEtiquetas(etiqueta: Etiqueta): void {
        this.filter.emit(etiqueta);
    }
}
