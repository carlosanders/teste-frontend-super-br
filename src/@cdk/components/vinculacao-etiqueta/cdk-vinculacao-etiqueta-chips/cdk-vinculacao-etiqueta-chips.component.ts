import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialog} from '@angular/material';
import {fuseAnimations} from '@fuse/animations';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {Pagination} from '@cdk/models/pagination';

import {CdkVinculacaoEtiquetaEditPluginComponent} from '../cdk-vinculacao-etiqueta-edit-plugin/cdk-vinculacao-etiqueta-edit-plugin.component';


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

    @Input()
    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];

    @Output()
    delete = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    edit = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    create = new EventEmitter<Etiqueta>();

    @Input()
    pagination: Pagination;

    @Input()
    valid = true;

    @ViewChild('etiquetaInput', {static: false}) etiquetaInput: ElementRef<HTMLInputElement>;
    @ViewChild('etiqueta', {static: false}) matAutocomplete: MatAutocomplete;

    constructor(public dialog: MatDialog) {
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

    openDialogEdit(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        //console.log("teste");
        //console.log(vinculacaoEtiqueta);
        const dialogRef = this.dialog.open(CdkVinculacaoEtiquetaEditPluginComponent, {
            data: {
                idVinculacao: vinculacaoEtiqueta.id,
                conteudo: vinculacaoEtiqueta.conteudo
            },
            hasBackdrop: false,
            closeOnNavigation: true
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result !== 0){
                vinculacaoEtiqueta.conteudo = result;
                this.edit.emit(vinculacaoEtiqueta);
            }
        });


    }    

}
