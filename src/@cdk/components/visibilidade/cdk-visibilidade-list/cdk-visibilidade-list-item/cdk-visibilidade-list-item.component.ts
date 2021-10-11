import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Usuario, Visibilidade} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';

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

    @Input()
    adminCount: number;

    @Output()
    delete = new EventEmitter<number>();

    usuario: Usuario;

    @Input()
    tipoRelatorio = false;

    constructor(public _loginService: LoginService) {
        this.usuario = _loginService.getUserProfile();
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
