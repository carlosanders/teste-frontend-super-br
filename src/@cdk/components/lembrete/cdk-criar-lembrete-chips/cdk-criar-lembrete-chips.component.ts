import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Lembrete, Pagination} from '../../../models';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-criar-lembrete-chips',
    templateUrl: './cdk-criar-lembrete-chips.component.html',
    styleUrls: ['./cdk-criar-lembrete-chips.component.scss']
})
export class CdkCriarLembreteChipsComponent {
    visible = true;
    selectable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    lembreteCtrl = new FormControl();

    @Input()
    lembretes: Lembrete[] = [];

    @Input()
    pagination: Pagination;

    @Output()
    delete = new EventEmitter<Lembrete>();

    @Output()
    create = new EventEmitter<Lembrete>();

    @ViewChild('lembreteInput', {static: true}) lembreteInput: ElementRef<HTMLInputElement>;
    @ViewChild('lembrete', {static: true}) matAutocomplete: MatAutocomplete;


    constructor() {
        this.pagination = new Pagination();
    }

    remove(lembrete: Lembrete): void {
        this.delete.emit(lembrete);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.create.emit(event.option.value);
        this.lembreteInput.nativeElement.value = '';
        this.lembreteCtrl.setValue(null);
    }
}
