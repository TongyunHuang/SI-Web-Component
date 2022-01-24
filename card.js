const template = document.createElement('template');
// HTML of the shadowDom
template.innerHTML = `
  <style> 
    .task-card {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      width: 500px;
      display: flex;
      grid-template-columns: 1fr 2fr;
      grid-gap:10px;
      margin-bottom:15px;
      border-bottom: blue 5px solid;
    }
    .task-card img{
      width: 100px;
      margin:auto;
    }
    .task-card button {
      cursor: pointer;
      height: 50%;
      background: blue;
      color: #fff;
      border: 0;
      border-radius: 5px;
      padding: 10px 10px;
      margin: auto;
      display:block;
    }
  </style>
  <div class="task-card">
    <img/>
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="due"/></p>
        <p><slot name="tag"/></p>
      </div>
      
    </div>
    <button id="status-info">Unfinish</button>
  </div>
`;


class TaskCard extends HTMLElement {
  constructor() {
    super();

    // state
    this.finish = false;

    // create a shadow dom s.t. styling in the component will not overwrite outside
    this.attachShadow({ mode: 'open' });
    // returns a copy of node, (set param to true) also includes the node's decendents
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // setup attributes
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('content');
    this.shadowRoot.querySelector('img').src = this.getAttribute('image');
  }

  // finish button listener callback function
  finishTask() {
    // flip bool
    this.finish = !this.finish;
    // get elements
    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#status-info');
    // modification
    if (this.finish) {

      toggleBtn.innerText = 'Done';
      toggleBtn.style.background = 'green';
    } else {
      toggleBtn.innerText = 'Unfinish';
      toggleBtn.style.background = 'blue';
    }
  }
  
  // Invoked when the custom element is first connected to the document's DOM
  connectedCallback() {
    this.shadowRoot.querySelector('#status-info').addEventListener('click', () => this.finishTask());
  }

  // Invoke when the custom element is disconnected from the document's DOM
  disconnectedCallback() {
    this.shadowRoot.querySelector('#status-info').removeEventListener();
  }

  
}

window.customElements.define('task-card', TaskCard)