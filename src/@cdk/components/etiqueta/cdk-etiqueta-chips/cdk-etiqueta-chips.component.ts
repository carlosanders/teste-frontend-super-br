import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {fuseAnimations} from '@fuse/animations';
import {Etiqueta} from '@cdk/models/etiqueta.model';

@Component({
    selector: 'cdk-etiqueta-chips',
    templateUrl: './cdk-etiqueta-chips.component.html',
    styleUrls: ['./cdk-etiqueta-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEtiquetaChipsComponent {

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    etiquetaCtrl = new FormControl();

    @Input()
    etiquetas: Etiqueta[] = [];

    @Output()
    delete = new EventEmitter<Etiqueta>();

    @Output()
    create = new EventEmitter<Etiqueta>();

    @ViewChild('etiquetaInput') etiquetaInput: ElementRef<HTMLInputElement>;
    @ViewChild('etiqueta') matAutocomplete: MatAutocomplete;

    constructor() {

    }

    remove(etiqueta: Etiqueta): void {
        this.delete.emit(etiqueta);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.create.emit(event.option.value);
        this.etiquetaInput.nativeElement.value = '';
        this.etiquetaCtrl.setValue(null);
    }

}