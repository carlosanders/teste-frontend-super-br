import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';

@Component({
    selector: 'cdk-validacao-transicao-workflow-list-item',
    templateUrl: './cdk-validacao-transicao-workflow-list-item.component.html',
    styleUrls: ['./cdk-validacao-transicao-workflow-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkValidacaoTransicaoWorkflowListItemComponent implements OnInit {

    @Input()
    validacao: ValidacaoTransicaoWorkflow;

    @Input()
    deleting: boolean;

    @Input()
    total: number;

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    constructor() {
        this.deleting = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

    doDelete(): void {
        this.delete.emit(this.validacao.id);
    }

}
