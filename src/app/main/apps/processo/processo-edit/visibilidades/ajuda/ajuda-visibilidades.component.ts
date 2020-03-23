import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { Topico } from 'ajuda/topico';

@Component({
    selector: 'ajuda-visibilidades',
    templateUrl: './ajuda-visibilidades.component.html',
    styleUrls: ['./ajuda-visibilidades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaVisibilidadesComponent {
    
    topicos: Topico[] = [];
    titulo = "visibilidades";
    
    Collapsible():void{
        var coll = document.getElementsByClassName("collapsible");
        var i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
            content.style.display = "none";
            } else {
            content.style.display = "block";
            }
            });
        } 
        }
    carregar(topico: string): void {
        this.titulo = topico;
    }
}
