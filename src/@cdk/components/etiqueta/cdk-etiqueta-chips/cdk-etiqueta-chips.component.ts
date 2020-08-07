import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@cdk/angular/material';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-etiqueta-chips',
    templateUrl: './cdk-etiqueta-chips.component.html',
    styleUrls: ['./cdk-etiqueta-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEtiquetaChipsComponent {

    visible = true;
    selectable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    etiquetaCtrl = new FormControl();

    @Input()
    etiquetas: Etiqueta[] = [];

    @Input()
    pagination: Pagination;

    @Output()
    delete = new EventEmitter<Etiqueta>();

    @Output()
    create = new EventEmitter<Etiqueta>();

    @Input()
    placeholder: string;

    @ViewChild('etiquetaInput', {static: true}) etiquetaInput: ElementRef<HTMLInputElement>;
    @ViewChild('etiqueta', {static: true}) matAutocomplete: MatAutocomplete;

    constructor() {
        this.pagination = new Pagination();
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
