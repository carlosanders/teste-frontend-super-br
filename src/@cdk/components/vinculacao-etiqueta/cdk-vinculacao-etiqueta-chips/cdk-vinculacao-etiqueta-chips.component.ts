import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, SimpleChange, ChangeDetectorRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialog, MatDialogRef} from '@angular/material';
import {fuseAnimations} from '@fuse/animations';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {Pagination} from '@cdk/models/pagination';
import {filter, tap, delay} from 'rxjs/operators';
import {CdkVinculacaoEtiquetaEditDialogComponent} from '../cdk-vinculacao-etiqueta-edit-dialog/cdk-vinculacao-etiqueta-edit-dialog.component';


@Component({
    selector: 'cdk-vinculacao-etiqueta-chips',
    templateUrl: './cdk-vinculacao-etiqueta-chips.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoEtiquetaChipsComponent {

    visible = true;
    selectable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    etiquetaCtrl = new FormControl();

    // é utlizada uma instância única para faciliar o fechamento do dialog através do método ngonchanges
    dialogRef: MatDialogRef<CdkVinculacaoEtiquetaEditDialogComponent, any>;

    @Input()
    savingVincEtiquetaId: number; 
    
    @Input() 
    placeholderEtiq: string;  

    @Input()
    errors: any; 

    @Input()
    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];

    @Output()
    delete = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    edit = new EventEmitter<any>();
    //@retirar:  edit = new EventEmitter<VinculacaoEtiqueta>();

   /*@retirar: 
   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';*/


    @Output()
    create = new EventEmitter<Etiqueta>();

    @Input()
    pagination: Pagination;

    @Input()
    valid = true;

    @ViewChild('etiquetaInput', {static: false}) etiquetaInput: ElementRef<HTMLInputElement>;
    @ViewChild('etiqueta', {static: false}) matAutocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog,
        //@retirar: private snackBar: MatSnackBar
    ) {
        this.pagination = new Pagination();
    }

    add(event: MatChipInputEvent): void {
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

            // Reset the input value
            if (input) {
                input.value = '';
            }

            this.etiquetaCtrl.setValue(null);
        }
    }

    remove(vinculacaoEtiqueta: VinculacaoEtiqueta): void {

        const index = this.vinculacoesEtiquetas.indexOf(vinculacaoEtiqueta);

        if (index >= 0) {
           // this.vinculacoesEtiquetas.splice(index, 1);
        }

        this.delete.emit(vinculacaoEtiqueta);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.create.emit(event.option.value);
        // this.vinculacoesEtiquetas.push(event.option.value);
        this.etiquetaInput.nativeElement.value = '';
        this.etiquetaCtrl.setValue(null);
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
      
        // o trecho de código abaixo é apenas para situações em que um dialog de
        // alteração de conteúdo de vinculação de etiqueta foi aberto
        if (this.dialogRef) {
                if (this.errors && this.errors.status && this.errors.status === 422) {//422) {
                    try {
                        const data = JSON.parse(this.errors.error.message);
                        const fields = Object.keys(data || {});
                        fields.forEach((field) => {
                            const control = this.dialogRef.componentInstance.form.get(field);
                            control.setErrors({formError: data[field].join(' - ')});
                        });

                    } catch (e) {
                        this.dialogRef.componentInstance.form.setErrors({rulesError: this.errors.error.message});
                        //@retirar: this.dialogRef.componentInstance.msgErroForm = this.errors.error.message;
                    } finally {
                        // o código abaixo foi colocado para que a mensagem de erro apareça
                        this.dialogRef.componentInstance.data.mostraSpinnerSalvamento = false;
                        this.dialogRef.componentInstance._changeDetectorRef.detectChanges();
                    }
                }
                if (!this.errors) {
                    Object.keys(this.dialogRef.componentInstance.form.controls).forEach(key => {
                        this.dialogRef.componentInstance.form.get(key).setErrors(null);
                    });
                    this.dialogRef.componentInstance.form.setErrors(null);

                    if (!this.savingVincEtiquetaId)  {
                        this.dialogRef.componentInstance.dialogRef.close();
                    }
                }
        }
        this._changeDetectorRef.markForCheck();
     }  

    openDialogEdit(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        // abre o diálogo de edição do conteúdo da etiqueta caso ela não esteja com status de saving (nesse estado ela vai ser ready-only)
        if (this.savingVincEtiquetaId!==vinculacaoEtiqueta.id) {    
            //@retirar: const dialogRef = this.dialog.open(CdkVinculacaoEtiquetaEditDialogComponent, {
            this.dialogRef = this.dialog.open(CdkVinculacaoEtiquetaEditDialogComponent, { 
                data: {
                    conteudo: vinculacaoEtiqueta.conteudo,
                    nome: vinculacaoEtiqueta.etiqueta.nome,
                    id: vinculacaoEtiqueta.id,
                    corFundo: vinculacaoEtiqueta.etiqueta.corHexadecimal,
                    mostraSpinnerSalvamento: false
                },
                width: '600px',
                height: '300px',
            });

            /*
            @retirar:
            dialogRef.afterClosed()
            .pipe(
                filter(result => result !== 0),
                delay(0),
                tap(result => vinculacaoEtiqueta.conteudo = result)
                )
            .subscribe(result => {
                // o settimeout é para evitar o erro "Expression Changed After It Has Been Checked Error: Expression has changed after it was checked."
                //setTimeout(() => vinculacaoEtiqueta.conteudo = result, 0);
                    this.edit.emit(vinculacaoEtiqueta);
            });*/


            const sub = this.dialogRef.componentInstance.editVinc.subscribe((result) => {    
                //@retirar:vinculacaoEtiqueta.conteudo = result;
                //@retirar:this.edit.emit(vinculacaoEtiqueta);

                //@retirar: const control = this.dialogRef.componentInstance.form.get('conteudo');

                this.edit.emit(result);


            });            
       
            this.dialogRef.afterClosed()
            .subscribe(result => {
                this.dialogRef = null;
            });
        }

    }    

}
