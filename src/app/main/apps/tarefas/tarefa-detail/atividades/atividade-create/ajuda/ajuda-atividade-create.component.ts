import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Topico} from 'ajuda/topico';


@Component({
    selector: 'ajuda-atividade-create',
    templateUrl: './ajuda-atividade-create.component.html',
    styleUrls: ['./ajuda-atividade-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaAtividadeCreateComponent{

    topicos: Topico[] = [];
    titulo = 'atividades';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}
