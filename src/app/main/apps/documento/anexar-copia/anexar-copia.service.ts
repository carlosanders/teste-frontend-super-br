import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ComponenteDigital} from '@cdk/models';

export interface ComponenteDigitalJuntada {
    id: number;
    texto: string;
    contador: number;
}

@Injectable({
    providedIn: 'root'
})
export class AnexarCopiaService {
    private _guardaAtivado: Subject<boolean> = new Subject();
    private _contadoresComponentesDigitaisJuntada: {
        [id: number]: ComponenteDigitalJuntada[]
    } = {};

    get guardaAtivado(): Subject<boolean> {
        return this._guardaAtivado;
    }

    set guardaAtivado(value: Subject<boolean>) {
        this._guardaAtivado = value;
    }

    get contadoresComponentesDigitais(): any {
        return this._contadoresComponentesDigitaisJuntada;
    }

    resetContadoresJuntada(juntadaId: number): void {
        this._contadoresComponentesDigitaisJuntada[juntadaId] = [];
    }

    addComponenteDigitalJuntada(juntadaId: number, componenteDigitalId: number, texto: string, contador: number): void {
        const componenteDigital: ComponenteDigitalJuntada = {
            id: componenteDigitalId,
            texto: texto,
            contador: contador
        };
        if (this._contadoresComponentesDigitaisJuntada[juntadaId]) {
            this._contadoresComponentesDigitaisJuntada[juntadaId].push(componenteDigital);
        } else {
            this._contadoresComponentesDigitaisJuntada[juntadaId] = [componenteDigital];
        }
    }

    sortComponentesDigitaisJuntada(juntadaId: number, componentesDigitais: ComponenteDigital[]): ComponenteDigital[] {
        const contadoresJuntada: ComponenteDigitalJuntada[] = this._contadoresComponentesDigitaisJuntada[juntadaId];
        const sortedComponentesDigitais: ComponenteDigital[] = [];
        contadoresJuntada.forEach((componenteDigitalJuntada) => {
            if (sortedComponentesDigitais.findIndex(cd => cd.id === componenteDigitalJuntada.id) === -1) {
                const found = componentesDigitais.find(cd => cd.id === componenteDigitalJuntada.id);
                if (found) {
                    sortedComponentesDigitais.push(found);
                }
            }
        });
        return sortedComponentesDigitais;
    }

    getTextoComponenteDigital(componenteDigitalId: number): string {
        let texto = '';
        Object.keys(this._contadoresComponentesDigitaisJuntada).forEach((juntadaId) => {
            const componenteDigital: ComponenteDigitalJuntada = this._contadoresComponentesDigitaisJuntada[juntadaId].find(contador => contador.id === componenteDigitalId);
            if (componenteDigital) {
                texto = componenteDigital.texto;
            }
        });
        return texto;
    }

    getContadorComponenteDigital(componenteDigitalId: number): number {
        let contador;
        Object.keys(this._contadoresComponentesDigitaisJuntada).forEach((juntadaId) => {
            const componenteDigital: ComponenteDigitalJuntada = this._contadoresComponentesDigitaisJuntada[juntadaId].find(contador => contador.id === componenteDigitalId);
            if (componenteDigital) {
                contador = componenteDigital.contador;
            }
        });
        return contador;
    }
}
