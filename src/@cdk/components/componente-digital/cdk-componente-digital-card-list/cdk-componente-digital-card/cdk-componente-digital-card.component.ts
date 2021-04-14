import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, DoCheck, EventEmitter, Input, KeyValueDiffers, OnChanges,
    OnInit, Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models';

@Component({
    selector: 'cdk-componente-digital-card',
    templateUrl: './cdk-componente-digital-card.component.html',
    styleUrls: ['./cdk-componente-digital-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: cdkAnimations
})
export class CdkComponenteDigitalCardComponent implements DoCheck, OnChanges {

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    selected = true;

    @Input()
    mode: string;

    @Input()
    uploadMode: string;

    @Input()
    uploading: boolean;

    @Output()
    retry = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    clicked = new EventEmitter<any>();

    @Output()
    changedSelected = new EventEmitter<boolean>();

    differ: any;

    title: string = 'CARREGANDO';

    fullTitle: string;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        differs: KeyValueDiffers
    ) {
        this.differ = differs.find([]).create();
        this.mode = 'tarefa';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['uploadMode']) {
            if (this.uploadMode === 'linear' && !this.uploading) {
                this.fullTitle = this.componenteDigital.fileName;
                this.title = !(this.fullTitle.length > 14) ?
                    this.fullTitle :
                    this.fullTitle.substr(0, 15) + "...";
            }
            if (this.uploadMode === 'linear' && this.uploading &&
                (!this.componenteDigital.inProgress && !this.componenteDigital.canRetry)) {
                this.title = 'AGUARDANDO';
            }
            if (this.uploadMode === 'linear' && this.uploading &&
                (this.componenteDigital.inProgress && !this.componenteDigital.canRetry)) {
                this.title = 'CARREGANDO';
            }
            this._changeDetectorRef.markForCheck();
        }
    }

    ngDoCheck(): void {
        const changes = this.differ.diff(this.componenteDigital);

        if (changes) {
            changes.forEachChangedItem((elt) => {
                if (elt.key === 'progress' || elt.key === 'inProgress' || elt.key === 'canRetry') {
                    if (this.componenteDigital.canRetry) {
                        this.fullTitle = this.componenteDigital.fileName;
                        this.title = !(this.fullTitle.length > 14) ?
                            this.fullTitle :
                            this.fullTitle.substr(0, 15) + "...";
                    }
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
