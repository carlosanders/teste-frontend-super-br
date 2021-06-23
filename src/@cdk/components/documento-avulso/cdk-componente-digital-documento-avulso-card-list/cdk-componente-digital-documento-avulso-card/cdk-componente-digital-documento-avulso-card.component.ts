import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    KeyValueDiffers,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';

@Component({
    selector: 'cdk-componente-digital-documento-avulso-card',
    templateUrl: './cdk-componente-digital-documento-avulso-card.component.html',
    styleUrls: ['./cdk-componente-digital-documento-avulso-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: cdkAnimations
})
export class CdkComponenteDigitalDocumentoAvulsoCardComponent implements DoCheck {

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    selected = true;

    @Output()
    retry = new EventEmitter<number>();

    @Output()
    cancel = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelected = new EventEmitter<boolean>();

    differ: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        differs: KeyValueDiffers
    ) {
        this.differ = differs.find([]).create();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngDoCheck(): void {
        const changes = this.differ.diff(this.componenteDigital);

        if (changes) {
            changes.forEachChangedItem((elt) => {
                if (elt.key === 'progress' || elt.key === 'inProgress') {
                    this._changeDetectorRef.markForCheck();
                }
            });
        }
    }

    toggleInSelected(componenteDigitalId): void {
        this.selected = !this.selected;
        this.changedSelected.emit(componenteDigitalId);
    }

    onCancel(componenteDigital): void {
        this.cancel.emit(componenteDigital);
    }

    onRetry(componenteDigital): void {
        this.retry.emit(componenteDigital);
    }

    onClick(componenteDigital): void {
        this.clicked.emit(componenteDigital);
    }
}
