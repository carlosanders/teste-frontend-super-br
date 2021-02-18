export const builtInButtons = {
    cancel: {
      classes: 'cancel-button',
      secondary: true,
      text: 'Exit',
      type: 'cancel'
    },
    next: {
      classes: 'next-button',
      text: 'Next',
      type: 'next'
    },
    back: {
      classes: 'back-button',
      secondary: true,
      text: 'Back',
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
      title: 'Seja bem-vindo ao SuperSapiens',
      text: `
        <div>
            <p>
              O Super Sapiens manteve as funcionalidades do antigo Sapiens, além de adicionar novas que auxiliarão o dia a dia do usuário.
            </p>
          
            <p>
              Estamos felizes em te convidar a participar desse tour pelo novo sistema.
            </p>
        </div>`
        
    },
    {
      attachTo: {
        element: '.toolbar-element',
        on: 'bottom'
      },
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back,
        builtInButtons.next
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'barra-superior',
      title: 'BARRA SUPERIOR',
      text: 'A Barra superior foi modificada e modernizada.'
    },
    {
      attachTo: {
        element: '.avatar-element',
        on: 'right'
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
        O nome fica em um lugar semelhante ao do Sapiens 1.0.
      </p>
      
      <p>
      Além disso, também é possível acessar as configurações e realizar o logout do sistema, na seta.
      </p>`
    },
    {
      attachTo: {
        element: 'cdk-search-bar',
        on: 'bottom'
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
        on: 'bottom'
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
            
          </p>
          `
    },
    {
      attachTo: {
        element: '.quick-panel-toggle-button2',
        on: 'bottom'
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
            
          </p>
          `
    },
    {
      attachTo: {
        element: '.quick-panel-toggle-button3',
        on: 'top'
      },
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back,
        builtInButtons.next
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'buttons',
      text: `For the common button types ("next", "back", "cancel", etc.), we implemented Ember actions
            that perform these actions on your tour automatically. To use them, simply include
            in the buttons array in each step.`
    },
    {
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back
      ],
      id: 'noAttachTo',
      title: 'Centered Modals',
      classes: 'custom-class-name-1 custom-class-name-2',
      text: 'If no attachTo is specified, the modal will appear in the center of the screen, as per the Shepherd docs.'
    }
  ];