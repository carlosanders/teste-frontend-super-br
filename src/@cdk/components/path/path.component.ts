import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '../../animations';

@Component({
    selector: 'path',
    templateUrl: './path.component.html',
    styleUrls: ['./path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PathComponent implements OnInit {

    @Input()
    icone: string;

    @Input()
    caminhoAbsoluto: string;

    @Input()
    inicioCaminho: string;

    linkCaminhos: [object] = [{}];

    mapaNome = new Map();

    constructor() {
    }

    ngOnInit(): void {
        this.carregarNomes();
        this.carregarCaminho();
    }

    carregarCaminho() {
        let caminhoAux = '';
        let caminhoAnterior = '';
        let chave = '';
        let valor = '';
        const posicao = this.caminhoAbsoluto.search(this.inicioCaminho);
        const raiz = this.caminhoAbsoluto.slice(0, posicao-1);
        this.caminhoAbsoluto = this.caminhoAbsoluto.slice(posicao, this.caminhoAbsoluto.length);
        const arrayCaminho = this.caminhoAbsoluto.split("/");
        arrayCaminho.forEach((c:string) => {
            if(c==='dados-basicos' || c==='default') { } //Não adiciona no link, para resolver despadronizacoes
            else if(c==='arvore') { //Entra se for arvore
                chave = `${raiz}${caminhoAux}/${c}`;
                valor = this.mapaNome.has(c) ? this.mapaNome.get(c) : c;
                this.linkCaminhos.push({link: chave, label: valor});
            }
            else if(!Number(c) && c!=='editar' && c!=='listar' && c!=='criar') { //Entra se for para listar
                caminhoAux += '/' + c;
                chave = `${raiz}${caminhoAux}/listar`;
                valor = this.mapaNome.has(c) ? this.mapaNome.get(c) : c;
                caminhoAnterior = c;
                this.linkCaminhos.push({link: chave, label: valor});
            }
            else if(c!=='editar' && c!=='listar') { //Entra se for numero ou criar
                chave = `${raiz}${caminhoAux}/editar/${c}`;
                caminhoAux += '/' + c;
                valor = this.mapaNome.has(caminhoAnterior) ? this.mapaNome.get(caminhoAnterior) : caminhoAnterior;
                valor = this.pluralParaSigular(valor);
                valor = valor + c;
                this.linkCaminhos.push({link: chave, label: valor});
            }
        });
        this.linkCaminhos.shift();
    }

    carregarNomes() { //Adicionar nomes compostos, que tenha acento e ç
        this.mapaNome.set('acoes', 'ações');
        this.mapaNome.set('arvore', 'árvore');
        this.mapaNome.set('avisos', 'avisos');
        this.mapaNome.set('classificacoes', 'classificações');
        this.mapaNome.set('especie-atividades', 'espécie atividades');
        this.mapaNome.set('especies-processo', 'espécie processos');
        this.mapaNome.set('especie-relevancias', 'espécie relevâncias');
        this.mapaNome.set('especie-setor', 'espécie setores');
        this.mapaNome.set('especie-tarefas', 'espécie tarefas');
        this.mapaNome.set('lotacoes', 'lotações');
        this.mapaNome.set('modalidade-orgao-central', 'modalidade orgãos centrais');
        this.mapaNome.set('municipios', 'municípios');
        this.mapaNome.set('notificacoes', 'notificações');
        this.mapaNome.set('tipos-relatorios', 'tipos de relatórios');
        this.mapaNome.set('transicoes', 'transições');
        this.mapaNome.set('repositorios', 'teses');
        this.mapaNome.set('seguranca', 'seguranças');
        this.mapaNome.set('usuarios', 'usuários');
        this.mapaNome.set('vinculacao-pessoa-usuario', 'usuários externos');
    }

    pluralParaSigular(palavra): string {
        let palavraSingular = '';
        let arrayPalavras = palavra.split(" ");
        arrayPalavras.forEach((valor) => {
            let tamanho = valor.length;
            if(valor.substr(tamanho-3, tamanho)==='res' || valor.substr(tamanho-3, tamanho)==='res') {
                palavraSingular += valor.substr(0, tamanho-2) + ' ';
            }
            else if(valor.substr(tamanho-3, tamanho)==='ões' || valor.substr(tamanho-3, tamanho)==='ãos') {
                palavraSingular += valor.substr(0, tamanho-3) + 'ão' + ' ';
            }
            else if(valor.substr(tamanho-3, tamanho)==='ais') {
                palavraSingular += valor.substr(0, tamanho-2) + 'l' + ' ';
            }
            else if(valor.substr(tamanho-1, tamanho)==='s') {
                palavraSingular += valor.substr(0, tamanho-1) + ' ';
            }
            else {
                palavraSingular += valor + ' ';
            }
        });
        return palavraSingular;
    }
}
