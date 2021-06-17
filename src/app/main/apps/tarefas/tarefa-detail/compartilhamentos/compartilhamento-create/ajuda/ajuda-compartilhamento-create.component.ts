import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Topico} from 'ajuda/topico';


@Component({
    selector: 'ajuda-compartilhamento-create',
    templateUrl: './ajuda-compartilhamento-create.component.html',
    styleUrls: ['./ajuda-compartilhamento-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaCompartilhamentoCreateComponent {

    topicos: Topico[] = [];
    titulo = 'compartilhamento';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}
