import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, DoCheck, EventEmitter, Input, KeyValueDiffers,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ComponenteDigital} from '@cdk/models';

@Component({
    selector: 'cdk-componente-digital-card',
    templateUrl: './cdk-componente-digital-card.component.html',
    styleUrls: ['./cdk-componente-digital-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class CdkComponenteDigitalCardComponent implements DoCheck {

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
