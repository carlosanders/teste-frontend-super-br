import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models';

@Component({
    selector: 'cdk-anexos-card',
    templateUrl: './cdk-anexos-card.component.html',
    styleUrls: ['./cdk-anexos-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAnexosCardComponent implements OnInit {

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    maisDeUmItemSelecionado = false;

    @Input()
    disabledSelect: boolean = false;

    @Input()
    selected = true;

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelected = new EventEmitter<boolean>();

    @Input()
    indice: number;

    @Input()
    texto: string;

    @Input()
    isSaving: boolean = false;

    @Input()
    isSaved: boolean = false;

    @Input()
    hasErrors: boolean = false;

    @Input()
    errors: string = '';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    toggleInSelected(componenteDigitalId): void {
        this.selected = !this.selected;
        this.changedSelected.emit(componenteDigitalId);
    }

    onClick(componenteDigital): void {
        this.selected = !this.selected;
        this.changedSelected.emit(componenteDigital.id);
    }
}
