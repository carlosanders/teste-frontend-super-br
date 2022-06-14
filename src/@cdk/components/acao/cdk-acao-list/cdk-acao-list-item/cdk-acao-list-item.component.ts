import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Acao, Colaborador} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';

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
    deleting: boolean;

    @Input()
    total: number;

    @Input()
    actions: string[] = ['delete'];

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
