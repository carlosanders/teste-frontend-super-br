import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {
    MatDialog,
} from '@cdk/angular/material';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models';


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
    selectable:boolean;

    @Input()
    deletable:boolean;

    @Input()
    saving:boolean;

    @Input()
    conteudo: string;

    @Input()
    iconeVisibilidade: string;

    @Output()
    delete:EventEmitter<Etiqueta> = new EventEmitter<Etiqueta>();

    @Output()
    select:EventEmitter<Etiqueta> = new EventEmitter<Etiqueta>();


    constructor(private _changeDetectorRef: ChangeDetectorRef,
                public dialog: MatDialog) {
    }

    remove(): void {
        this.delete.emit(this.etiqueta);
    }

    openDialogEdit(): void {
        if (this.selectable) {
            this.select.emit(this.etiqueta);
        }
    }

    getTooltip(): string {
        if (this.selectable) {
            return "Clique para editar o conteúdo";
        }

        return "";
    }
}
