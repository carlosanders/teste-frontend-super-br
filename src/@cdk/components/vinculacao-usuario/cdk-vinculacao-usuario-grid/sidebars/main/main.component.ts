import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'cdk-vinculacao-usuario-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkVinculacaoUsuarioMainSidebarComponent {
    @Output()
    selected = new EventEmitter<any>();

    gridFilter: any;

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.selected.emit(this.gridFilter);
    }

}
