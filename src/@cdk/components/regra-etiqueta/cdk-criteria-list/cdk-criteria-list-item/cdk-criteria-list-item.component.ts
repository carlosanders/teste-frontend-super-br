import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Criteria} from '@cdk/models';

@Component({
    selector: 'cdk-criteria-list-item',
    templateUrl: './cdk-criteria-list-item.component.html',
    styleUrls: ['./cdk-criteria-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkCriteriaListItemComponent implements OnInit {

    @Input()
    criteria: Criteria;

    @Input()
    deleting: boolean;

    @Input()
    total: number;

    @Output()
    delete = new EventEmitter<number>();

    constructor() {
        this.deleting = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

    doDelete(): void {
        this.delete.emit(this.criteria.id);
    }
}
