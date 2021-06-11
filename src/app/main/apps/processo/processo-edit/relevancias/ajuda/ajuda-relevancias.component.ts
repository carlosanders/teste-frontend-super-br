import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {Topico} from 'ajuda/topico';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-relevancias',
    templateUrl: './ajuda-relevancias.component.html',
    styleUrls: ['./ajuda-relevancias.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaRelevanciasComponent {

    topicos: Topico[] = [];
    titulo = 'relevancias';

    carregar(topico: string): void {
        this.titulo = topico;
    }
}
