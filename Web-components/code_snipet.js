($ =>
  {
    let source = document.currentScript.src;

    if(!customElements.get('input-directory'))
       customElements.define('input-directory', class extends HTMLElement{
        constructor() {
          super();
          this.shadow = this.attachShadow({ mode: 'closed' });
  
          (() => {
            let link = this.shadow.appendChild(document.createElement('link'));
            link.rel = 'stylesheet';
            link.href = `${new URL(source).origin}/express/component/theme.css`;
          })();
  
          (() => {
            let link = this.shadow.appendChild(document.createElement('link'));
            link.rel = 'stylesheet';
            link.href = source.replace(/\.js/, '.css');
          })();
        }
      });
  }
)();