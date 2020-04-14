import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'cdk-versao-documento-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: cdkAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkVersaoMainSidebarComponent {
    @Output()
    selected = new EventEmitter<any>();

    gridFilter: any;

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.selected.emit(this.gridFilter);
    }

}
