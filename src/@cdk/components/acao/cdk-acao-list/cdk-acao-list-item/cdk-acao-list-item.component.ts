import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Acao} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models';
import {TriggerAcao} from "../../../../models/trigger-acao";

@Component({
    selector: 'cdk-acao-list-item',
    templateUrl: './cdk-acao-list-item.component.html',
    styleUrls: ['./cdk-acao-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkAcaoListItemComponent implements OnInit {

    @Input()
    acao: Acao;

    @Input()
    triggerAcao: TriggerAcao;

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
