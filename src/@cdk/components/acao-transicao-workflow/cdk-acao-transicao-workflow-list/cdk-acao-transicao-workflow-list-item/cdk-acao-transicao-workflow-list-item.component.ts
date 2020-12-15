import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Acao} from '@cdk/models';
//o-- rever model
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models';

@Component({
    selector: 'cdk-acao-list-item',
    templateUrl: './cdk-acao-transicao-workflow-list-item.component.html',
    styleUrls: ['./cdk-acao-transicao-workflow-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkAcaoTransicaoWorkflowListItemComponent implements OnInit {

    @Input()
    acao: Acao;

    @Input()
    deleting: boolean;

    @Input()
    total: number;

    @Output()
    delete = new EventEmitter<number>();

    colaborador: Colaborador;

    constructor(public _loginService: LoginService) {
        this.colaborador = _loginService.getUserProfile().colaborador;
        this.deleting = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

    doDelete(): void {
        this.delete.emit(this.acao.id);
    }
}
