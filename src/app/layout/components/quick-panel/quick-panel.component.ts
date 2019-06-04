import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit {
    date: Date;
    operacoes: any[] = [];
    settings: any;

    /**
     * Constructor
     */
    constructor(private _store: Store<fromStore.State>) {
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true
        };
    }

    ngOnInit(): void {

        this._store
            .pipe(
                select(fromStore.getOperacoesState),
                filter(op => !!op && !!op.content)
            )
            .subscribe(
            operacao => {
                this.operacoes.push(operacao);
                if (this.operacoes.length > 30) {
                    this.operacoes.shift();
                }
            }
        );
    }
}
