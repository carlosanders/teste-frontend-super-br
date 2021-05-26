import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-admin',
    templateUrl: './ajuda-admin.component.html',
    styleUrls: ['./ajuda-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaAdminComponent {

    topicos: Topico[] = [];
    titulo = 'admin';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}
