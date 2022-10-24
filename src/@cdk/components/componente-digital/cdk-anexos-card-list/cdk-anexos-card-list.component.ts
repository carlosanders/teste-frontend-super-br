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
import {AnexarCopiaService} from '../../../../app/main/apps/documento/anexar-copia/anexar-copia.service';

@Component({
    selector: 'cdk-anexos-card-list',
    templateUrl: './cdk-anexos-card-list.component.html',
    styleUrls: ['./cdk-anexos-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAnexosCardListComponent implements OnInit {

    @Input()
    componentesDigitais: ComponenteDigital[];

    @Input()
    disabledSelects: number[] = [];

    @Input()
    savingComponentesDigitaisIds: number[] = [];

    @Input()
    savedComponentesDigitaisIds: number[] = [];

    @Input()
    errorsComponentesDigitaisIds: number[] = [];

    @Output()
    clicked = new EventEmitter<{componenteDigital: ComponenteDigital; event: any}>();

    @Input()
    loading = false;

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    @Input()
    selectedIds: number[] = [];

    @Input()
    isIndeterminate = false;

    @Input()
    errors: any = {};

    hasSelected = false;

    /**
     *
     * @param _changeDetectorRef
     * @param anexarCopiaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public anexarCopiaService: AnexarCopiaService
    ) {}

    ngOnInit(): void {
    }

    toggleInSelected(componenteDigitalId): void {
        const selectedComponenteDigitalIds = [...this.selectedIds];
        if (selectedComponenteDigitalIds.find(id => id === componenteDigitalId) !== undefined) {
            this.selectedIds = selectedComponenteDigitalIds.filter(id => id !== componenteDigitalId);
        } else {
            this.selectedIds = [...selectedComponenteDigitalIds, componenteDigitalId];
        }
        this.hasSelected = this.selectedIds.length > 0;
        this.changedSelectedIds.emit(this.selectedIds);
        this.isIndeterminate = (this.selectedIds.length !== this.componentesDigitais.length && this.selectedIds.length > 0);
    }

    onClick(componenteDigital, event): void {
        this.clicked.emit({componenteDigital, event});
    }

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void {
        if (!this.disabledSelects.length) {
            ev.preventDefault();

            if (this.selectedIds.length && this.selectedIds.length > 0) {
                this.deselectAll();
            } else {
                this.selectAll();
            }
        }
    }

    /**
     * Select all
     */
    selectAll(): void {
        const arr = Object.keys(this.componentesDigitais).map(k => this.componentesDigitais[k]);
        this.selectedIds = arr.map(componenteDigital => componenteDigital.id);
        this.recompute();
    }

    /**
     * Deselect all componentesDigitais
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.componentesDigitais.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
    }

    componenteDigitalTrackBy(index, componenteDigital: ComponenteDigital): number {
        return componenteDigital.id;
    }
}
