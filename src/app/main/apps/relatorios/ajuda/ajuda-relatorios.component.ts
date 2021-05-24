import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-relatorios',
    templateUrl: './ajuda-relatorios.component.html',
    styleUrls: ['./ajuda-relatorios.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaRelatoriosComponent {

    topicos: Topico[] = [];
    titulo = 'relatorios';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}
