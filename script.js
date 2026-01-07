const links = document.querySelectorAll('.nav-links a');
const secoes = document.querySelectorAll('main, .painel-branco');
const containerAnimais = document.querySelector('.container');
const form = document.getElementById('add-animal-form');
let idEdicao = null;

// --- 1. NAVEGAÇÃO ---
links.forEach(link => {
    link.addEventListener('click', (e) => {
        const idSeccao = link.getAttribute('href');

        if (idSeccao.startsWith('#')) {
            e.preventDefault();
            secoes.forEach(section => section.style.display = 'none');

            const barraBusca = document.querySelector('.busca-container');
            if (barraBusca) {
                // Se o destino for #inicio, mostra a busca (block). Se não, esconde (none).
                barraBusca.style.display = (idSeccao === '#inicio') ? 'block' : 'none';
            }

            const target = document.querySelector(idSeccao);
            if (target) {
                target.style.display = (idSeccao === '#inicio') ? 'flex' : 'block';
            }
            
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// --- 2. COMUNICAÇÃO COM O SERVIDOR (BACKEND) ---

// Função para renderizar os pets buscando do MySQL
async function renderizarPets(termoBusca = "") {
    try {
        const resposta = await fetch('http://localhost:3000/cadastro_pets');
        let listaParaExibir = await resposta.json();

        // Filtro de busca (feito no front-end para agilizar)
        if (termoBusca) {
            listaParaExibir = listaParaExibir.filter(p => 
                p.nome.toLowerCase().includes(termoBusca) || 
                p.especie.toLowerCase().includes(termoBusca) ||
                (p.cor && p.cor.toLowerCase().includes(termoBusca))||
                (p.raca && p.raca.toLowerCase().includes(termoBusca)) ||
                (p.genero && p.genero.toLowerCase().includes(termoBusca))
            );
        }

        if (!containerAnimais) return;
        containerAnimais.innerHTML = '';

        listaParaExibir.forEach(pet => {
            const card = document.createElement('section');
            card.classList.add('animal-card');
            card.innerHTML = `
                <img src="${pet.foto}" alt="${pet.nome}">
                <h2>${pet.nome}</h2>
                <div style="font-weight: 600; font-size: 0.9rem; color: #444;">
                    ${pet.especie} • ${pet.raca} • ${pet.genero}
                </div>
                <div style="font-size: 0.8rem; color: #888; margin-bottom: 8px;">
                    Cor: ${pet.cor}
                </div>
                <p style="font-size: 0.85rem; color: #666; line-height: 1.4;">${pet.sobre}</p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;">
                
                <div style="font-size: 0.8rem; color: #555;">
                    <strong>Doador:</strong> ${pet.nome_tutor} <br>
                    <strong>Contato:</strong> ${pet.telefone_tutor}
                </div>

               <div class="card-botoes" style="margin-top: 15px; display: flex; gap: 5px;">
               <button onclick="removerPet(${pet.id})" class="btn-remover">Remover</button>
                <button onclick="editarPorId(${pet.id})" class="btn-editar">Editar</button>
            `;               //REMOVIDO <button class="btn-adotar">Quero Adotar</button>

            containerAnimais.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro ao carregar pets:", erro);
    }
}

// Evento de envio do formulário para o MySQL
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Coleta os dados (verifique se os IDs no HTML são exatamente estes)
    const novoPet = {
        nome: document.getElementById('nome').value,
        especie: document.getElementById('especie').value,
        raca: document.getElementById('raca').value,           // ADICIONADO
        idade: document.getElementById('idade').value,
        foto: document.getElementById('fotoURL').value, 
        sobre: document.getElementById('sobre').value,
        genero: document.getElementById('genero').value,
        cor: document.getElementById('cor').value,
        temperamento: document.getElementById('temperamento').value,
        nome_tutor: document.getElementById('nome_tutor').value,       // ADICIONADO
        telefone_tutor: document.getElementById('telefone_tutor').value // ADICIONADO
    };
    // Se idEdicao tiver um número, usamos PUT e a URL com ID. Se for null, usamos POST.
    const url = idEdicao 
        ? `http://localhost:3000/cadastro_pets/${idEdicao}` 
        : 'http://localhost:3000/cadastro_pets';
    
    const metodo = idEdicao ? 'PUT' : 'POST';
    // -------------------------------

    console.log(`Tentando ${metodo} para ${url}:`, novoPet);

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(novoPet)
        });

        if (resposta.ok) {
            const resultado = await resposta.json();
            console.log("Resposta do servidor:", resultado);
            
            alert(idEdicao ? "Pet atualizado com sucesso!" : "Pet cadastrado com sucesso!");
            
            // RESETAR TUDO
            idEdicao = null; // Muito importante para o próximo clique não tentar editar de novo
            form.reset();
            document.querySelector('#add-animal-form button[type="submit"]').innerText = "Cadastrar Pet";
            
            renderizarPets(); 
            document.querySelector('a[href="#inicio"]').click(); 
        } else {
            const erroTexto = await resposta.text();
            console.error("Erro detalhado do servidor:", erroTexto);
            alert("Erro ao salvar: " + erroTexto);
        }
    } catch (erro) {
        console.error("Erro de conexão:", erro);
        alert("O servidor não está respondendo.");
    }
});

// Função para remover pet do MySQL

//ToDo: ALTERAR PARA APENAS DEIXAR INVISVEL E NAO REMOVER COMPLETAMENTE
async function removerPet(id) {
    if (confirm("Tem certeza que deseja remover este pet?")) {
        try {
            const resposta = await fetch(`http://localhost:3000/cadastro_pets/${id}`, {
                method: 'DELETE'
            });
            if (resposta.ok) {
                renderizarPets();
            }
        } catch (erro) {
            alert("Erro ao remover pet.");
        }
    }
}

//EDIÇÃO

async function editarPorId(id) {
    try {
        const resposta = await fetch(`http://localhost:3000/cadastro_pets`);
        const pets = await resposta.json();
        const pet = pets.find(p => p.id === id);

        if (pet) {
            preencherFormularioParaEdicao(pet);
        }
    } catch (erro) {
        console.error("Erro ao buscar pet para edição:", erro);
    }
}

function preencherFormularioParaEdicao(pet) {


    idEdicao = pet.id; // Salva o ID do pet que vamos editar

    // Preenche cada campo do formulário com os dados atuais do pet
    document.getElementById('nome').value = pet.nome;
    document.getElementById('especie').value = pet.especie;
    document.getElementById('raca').value = pet.raca;
    document.getElementById('idade').value = pet.idade;
    document.getElementById('fotoURL').value = pet.foto;
    document.getElementById('sobre').value = pet.sobre;
    document.getElementById('genero').value = pet.genero;
    document.getElementById('cor').value = pet.cor;
    document.getElementById('temperamento').value = pet.temperamento;
    document.getElementById('nome_tutor').value = pet.nome_tutor;
    document.getElementById('telefone_tutor').value = pet.telefone_tutor;


    // Muda o texto do botão para o usuário saber que está editando
    const btnSalvar = document.querySelector('#add-animal-form button[type="submit"]');
    btnSalvar.innerText = "Salvar Alterações";
    btnSalvar.style.backgroundColor = "#28a745"; // Cor de "sucesso/editando"


   //Esconde botão de Limpar
    const btnLimpar = document.querySelector('.btn-limpar');
    if (btnLimpar) btnLimpar.style.display = 'none';
   
    // Mostra o botão cancelar 
    const btnCancelar = document.getElementById('btn-cancelar');
    if (btnCancelar) btnCancelar.style.display = 'inline-block';

    // Redireciona visualmente para a seção de cadastro
    document.querySelector('a[href="#cadastro"]').click();
}

function cancelarEdicao() {
    idEdicao = null; // Reseta o ID global
    form.reset();    // Limpa os campos
    
// --- RESET DOS BOTOES ---
    const btnSalvar = document.querySelector('#add-animal-form button[type="submit"]');
    btnSalvar.innerText = "Cadastrar Pet";
    btnSalvar.classList.remove('modo-edicao');

    // No cadastro novo: MOSTRA Limpar e ESCONDE Cancelar
    document.querySelector('.btn-limpar').style.display = 'inline-block';
    document.getElementById('btn-cancelar').style.display = 'none';
    
    // Volta para o início
    document.querySelector('a[href="#inicio"]').click();
}




// --- 3. INICIALIZAÇÃO E EVENTOS ---

// Filtro de busca
document.getElementById('inputBusca').addEventListener('input', (e) => {
    renderizarPets(e.target.value.toLowerCase());
});

// Botão flutuante
document.getElementById('link-flutuante').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('a[href="#cadastro"]').click();
});

// Estado inicial da página
document.getElementById('cadastro').style.display = 'none';
document.getElementById('sobre-ong').style.display = 'none';
document.getElementById('inicio').style.display = 'flex';

renderizarPets();