import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-protocolo-create',
    templateUrl: './ajuda-protocolo-create.component.html',
    styleUrls: ['./ajuda-protocolo-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaProtocoloCreateComponent {


    topicos: Topico[] = [];
    titulo = 'Criar Protocolo';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}
