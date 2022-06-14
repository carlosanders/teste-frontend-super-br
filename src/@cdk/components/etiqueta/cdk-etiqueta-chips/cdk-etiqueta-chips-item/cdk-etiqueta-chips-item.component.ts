import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    MatDialog,
} from '@cdk/angular/material';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models';
import {MatMenuTrigger} from '@angular/material/menu';


@Component({
    selector: 'cdk-etiqueta-chips-item',
    templateUrl: './cdk-etiqueta-chips-item.component.html',
    styleUrls: ['./cdk-etiqueta-chips-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEtiquetaChipsItemComponent {

    @Input()
    etiqueta: Etiqueta;

    @Input()
    selectable: boolean;

    @Input()
    editable: boolean;

    @Input()
    deletable: boolean;

    @Input()
    saving: boolean;

    @Input()
    conteudo: string;

    @Input()
    hasPendencies: boolean;

    @Input()
    iconeVisibilidade: string;

    @Output()
    delete: EventEmitter<Etiqueta> = new EventEmitter<Etiqueta>();

    @Output()
    select: EventEmitter<{etiqueta: Etiqueta, scope: CdkEtiquetaChipsItemComponent}> = new EventEmitter<{etiqueta: Etiqueta, scope: CdkEtiquetaChipsItemComponent}>();

    @Output()
    edit: EventEmitter<Etiqueta> = new EventEmitter<Etiqueta>();

    @Output()
    pendencies: EventEmitter<Etiqueta> = new EventEmitter<Etiqueta>();

    @Output()
    filter: EventEmitter<Etiqueta> = new EventEmitter<Etiqueta>();

    @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                public dialog: MatDialog) {
    }

    doRemove(): void {
        this.matMenuTrigger.closeMenu();
        this.delete.emit(this.etiqueta);
    }

    doEdit(): void {
        if (this.editable) {
            this.matMenuTrigger.closeMenu();
            this.edit.emit(this.etiqueta);
        }
    }

    corHexadecimalFonte() {
        if (this.etiqueta.corHexadecimal === '#FFFFF0' ||
            this.etiqueta.corHexadecimal === '#FFEB3B') {
            return 'black';
        }
        return 'white';
    }

    doSelect(): void {
        if (this.selectable) {
            this.select.emit({etiqueta: this.etiqueta, scope: this});
        }
    }

    doPendencias(): void {
        if (this.hasPendencies) {
            this.pendencies.emit(this.etiqueta);
        }
    }

    canOpenMenu(): boolean {
        return !this.saving && (this.hasPendencies || this.deletable || this.editable);
    }

    doFiltro(): void {
        if (this.selectable) {
            this.filter.emit(this.etiqueta);
        }
    }
}
