const links = document.querySelectorAll('.nav-links a');
const secoes = document.querySelectorAll('main, .painel-branco');
const containerAnimais = document.querySelector('.container');
const form = document.getElementById('add-animal-form');

// --- 1. NAVEGAÇÃO ---
links.forEach(link => {
    link.addEventListener('click', (e) => {
        const idSeccao = link.getAttribute('href');

        if (idSeccao.startsWith('#')) {
            e.preventDefault();
            secoes.forEach(section => section.style.display = 'none');

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
        const resposta = await fetch('http://localhost:3000/pets');
        let listaParaExibir = await resposta.json();

        // Filtro de busca (feito no front-end para agilizar)
        if (termoBusca) {
            listaParaExibir = listaParaExibir.filter(p => 
                p.nome.toLowerCase().includes(termoBusca) || 
                p.especie.toLowerCase().includes(termoBusca) ||
                (p.cor && p.cor.toLowerCase().includes(termoBusca))
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
                    ${pet.especie} • ${pet.genero} • ${pet.cor}
                </div>
                <p style="font-size: 0.85rem; color: #666;">${pet.sobre}</p>
                <div class="card-botoes">
                    <button onclick="removerPet(${pet.id})" class="btn-remover">Remover</button>
                    <button class="btn-adotar">Quero Adotar</button>
                </div>
            `;
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
        idade: document.getElementById('idade').value,
        foto: document.getElementById('fotoURL').value, // Certifique-se que o ID no HTML é fotoURL
        sobre: document.getElementById('sobre').value,
        genero: document.getElementById('genero').value,
        cor: document.getElementById('cor').value,
        temperamento: document.getElementById('temperamento').value
    };

    console.log("Tentando enviar estes dados:", novoPet);

    try {
        const resposta = await fetch('http://localhost:3000/pets', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(novoPet)
        });

        if (resposta.ok) {
            const resultado = await resposta.json();
            console.log("Resposta do servidor:", resultado);
            alert("Pet cadastrado com sucesso!");
            form.reset();
            renderizarPets(); 
            document.querySelector('a[href="#inicio"]').click(); 
        } else {
            const erroTexto = await resposta.text();
            console.error("Erro detalhado do servidor:", erroTexto);
            alert("Erro ao salvar: " + erroTexto);
        }
    } catch (erro) {
        console.error("Erro de conexão (o servidor está ligado?):", erro);
        alert("O servidor não está respondendo. Verifique o terminal do Node.");
    }
});

// Função para remover pet do MySQL
async function removerPet(id) {
    if (confirm("Tem certeza que deseja remover este pet?")) {
        try {
            const resposta = await fetch(`http://localhost:3000/pets/${id}`, {
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