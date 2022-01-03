export const builtInButtons = {
    cancel: {
        classes: 'cancel-button',
        secondary: true,
        text: 'Sair',
        type: 'cancel'
    },
    next: {
        classes: 'next-button',
        text: 'Próximo',
        type: 'next'
    },
    back: {
        classes: 'back-button',
        secondary: true,
        text: 'Anterior',
        type: 'back'
    }
};

export const defaultStepOptions = {
    classes: 'tour-title tour-text',
    scrollTo: true,
    cancelIcon: {
        enabled: true
    }
};

export const steps = [
    {
        buttons: [
            builtInButtons.cancel,
            builtInButtons.next
        ],
        classes: 'shepherd-text',
        id: 'intro',
        title: 'Seja bem-vindo',
        text: `
        <div>
            <p>
              O sistema manteve as funcionalidades do antigo Sapiens, além de adicionar novas que auxiliarão o dia a dia do usuário.
            </p>

            <p>
              Estamos felizes em te convidar a participar desse tour pelo novo sistema.
            </p>
        </div>`

    },
    {
        attachTo: {
            element: 'widgets',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        id: 'Widgets',
        title: 'Widgets',
        text: 'A página inicial agora está mais limpa e mostra as informações mais importantes para o usuário, por meio de widgets.'
    },
    {
        attachTo: {
            element: 'widget-alerta',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'Widget Avisos',
        title: 'Widget Avisos',
        text: 'Os avisos mostram as informações relevantes do sistema no momento. O email de suporte também é enviado'
    },
    {
        attachTo: {
            element: 'widget-historico',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'Widget Histórico',
        title: 'Widget Histórico',
        text: 'O Histórico mostra as últimas ações do usuário como criação de tarefas e processos'
    },
    {
        attachTo: {
            element: 'widgets',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'Widgets2',
        title: 'Widgets',
        text: `Além das informações já ressaltadas anteriormente,
          o painel também coloca as informações das Tarefas pendentes de conclusão,
          dos Ofícios pendentes de resposta e das Tramitações pendentes de recebimento.
          Dependendo dos poderes do usuário, outras informações são mostradas.`
    },
    {
        attachTo: {
            element: '.navbar-scroll-container',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'Painel Lateral',
        title: 'Painel Lateral',
        text: 'No Painel lateral, que pode ser fixado ou não, o usuário pode acessar diferentes opções do sistema'
    },
    {
        attachTo: {
            element: '.material2',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'Painel Lateral',
        title: 'Painel Lateral',
        text: `As aplicações que podem ser acessadas são o Painel, as Tarefas, o Protocolo e a Pesquisa.
          Também é possível acessar os módulos. Por padrão o usuário possui o Módulo Relatórios habilitado.`
    },
    {
        attachTo: {
            element: '.toolbar-element',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'barra-superior',
        title: 'Barra Superior',
        text: 'A Barra superior foi modificada e modernizada.'
    },
    {
        attachTo: {
            element: '.avatar-element',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        canClickTarget: true,
        id: 'Nome',
        title: 'Nome, Configurações e Logout',
        text: `
      <p>
        O nome fica em um lugar semelhante ao do sistema antigo.
      </p>

      <p>
      Além disso, também é possível acessar as configurações e realizar o logout do sistema, na seta.
      </p>`
    },
    {
        attachTo: {
            element: 'cdk-search-bar',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'pesquisa-rapida',
        title: 'Pesquisa Rápida',
        text: `
          <p>
            Uma nova forma de pesquisar foi acrescentada. Agora, é possível localizar processos rapidamente por meio dessa opção
          </p>
          `
    },
    {
        attachTo: {
            element: '.quick-panel-toggle-button',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'notificacoes',
        title: 'Notificações',
        text: `
          <p>
            Nas notificações ficam os avisos de movimentação em NUPs que o usuário marcou para acompanhar.
          </p>
          `
    },
    {
        attachTo: {
            element: '.quick-panel-toggle-button2',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        canClickTarget: false,
        id: 'ajuda',
        title: 'Ajuda',
        text: `
          <p>
            Acesso a uma Ajuda ao sistema com várias informações importantes e vídeos.
          </p>
          `
    },
    {
        attachTo: {
            element: '.quick-panel-toggle-button3',
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'Últimas Operações',
        title: 'Últimas Operações',
        text: 'Mostra as ultimas operaçoes realizadas pelo usuario'
    },

    {
        buttons: [
            builtInButtons.cancel,
            builtInButtons.back
        ],
        id: 'noAttachTo',
        title: 'Fim do Tour',
        classes: 'custom-class-name-1 custom-class-name-2',
        text: 'Esperamos que o novo sistema facilite seu dia a dia!'
    }
];
