// Referenciar o input
let input = document.querySelector('input[name=tarefa]');

// Referenciar o button
let btn = document.querySelector('#botao');

// Referenciar a lista
let lista = document.querySelector('#lista');

let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas() {
    // Limpa a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';

    for (tarefa of tarefas) {
        // Criar o item da lista
        let itemLista = document.createElement('li');

        // Adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        // Adicionar evento de clique no item da lista
        itemLista.addEventListener('click', () => {
            removerTarefas(this);
        });

        // Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        // Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        // Adicionar o item da lista na lista
        lista.appendChild(itemLista);
    }
}
// Executando a função para renderizar as tarefas
renderizarTarefas();

// Escutar o evento de clique no botão
btn.addEventListener('click', () => {
    // Capturar o valor digitado pelo usuário no input
    let novaTarefa = input.value;

    if (novaTarefa !== '') {
        // Atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);

        // Executando a função para renderizar as tarefas
        renderizarTarefas();

        // Limpar o input
        input.value = '';

        // Limpar mensagens de erro (spans)
        removerSpans();

        // Salva os novos dados no banco de dados
        salvarDadosNoStorage();
    } else {
        // Limpar mensagens de erro (spans)
        removerSpans();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informar a tarefa!');

        span.appendChild(msg);

        card.appendChild(span);
    }
});

function removerSpans() {
    let spans = document.querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
    }
}

function removerTarefas(tar) {
    // Remover a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    // Renderiza novamente a tela
    renderizarTarefas();

    // Salva os novos dados no banco de dados
    salvarDadosNoStorage();
}

function salvarDadosNoStorage() {
    // Transforma o array em uma lista de string e salva no Storage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}



