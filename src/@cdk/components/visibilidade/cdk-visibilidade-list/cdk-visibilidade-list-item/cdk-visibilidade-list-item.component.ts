import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Visibilidade} from '@cdk/models/visibilidade.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models/colaborador.model';

@Component({
    selector: 'cdk-visibilidade-list-item',
    templateUrl: './cdk-visibilidade-list-item.component.html',
    styleUrls: ['./cdk-visibilidade-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkVisibilidadeListItemComponent implements OnInit {

    @Input()
    visibilidade: Visibilidade;

    @Input()
    deleting: boolean;

    @Input()
    total: number;

    @Output()
    delete = new EventEmitter<number>();

    colaborador: Colaborador;

    constructor(private _loginService: LoginService) {
        this.colaborador = _loginService.getUserProfile().colaborador;
        this.deleting = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

    doDelete(): void {
        this.delete.emit(this.visibilidade.id);
    }
}
