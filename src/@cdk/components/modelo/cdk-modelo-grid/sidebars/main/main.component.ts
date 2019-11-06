import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {CdkModeloGridComponent} from '../../cdk-modelo-grid.component';

@Component({
    selector: 'cdk-modelo-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkModeloMainSidebarComponent {
    @Output()
    selected = new EventEmitter<any>();

    gridFilter: any;

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.selected.emit(this.gridFilter);
    }

}
