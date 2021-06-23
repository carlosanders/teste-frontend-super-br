import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-processo-edit',
    templateUrl: './ajuda-processo-edit.component.html',
    styleUrls: ['./ajuda-processo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaProcessoEditComponent {

    topicos: Topico[] = [];
    titulo = 'processo';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}
