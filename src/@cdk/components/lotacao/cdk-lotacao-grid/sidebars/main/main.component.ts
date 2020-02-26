import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {Pagination} from "../../../../../models/pagination";

@Component({
    selector: 'cdk-lotacao-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkLotacaoMainSidebarComponent {
    @Output()
    selected = new EventEmitter<any>();

    gridFilter: any;

    @Input()
    pagination: Pagination = new Pagination();

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.selected.emit(this.gridFilter);
    }

}
