import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Assunto} from '@cdk/models/assunto.model';
import { processo } from '@cdk/normalizr/processo.schema';

@Component({
    selector: 'cdk-assunto-list-item',
    templateUrl: './cdk-assunto-list-item.component.html',
    styleUrls: ['./cdk-assunto-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkAssuntoListItemComponent implements OnInit {

    @Input()
    assunto: Assunto;

    
    

    draggable = {
        // note that data is handled with JSON.stringify/JSON.parse
        // only set simple data or POJO's as methods will be lost
        data: null,
        effectAllowed: 'all',
        disable: false,
        handle: false
    };

    constructor() {
        
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.draggable.data = this.assunto;
    }

    
}
