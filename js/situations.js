// Implementação das categorias de situações
// Este arquivo contém a lógica para gerenciar as diferentes situações no aplicativo

// Definição detalhada das situações
const situationDetails = {
    casual: {
        nome: "Casual",
        icone: "fa-coffee",
        descricao: "Roupas confortáveis para o dia a dia, encontros com amigos ou passeios.",
        estilos: ['casual', 'esportivo'],
        cores: ['todas'],
        estacao: 'todas',
        dicas: [
            "Prefira tecidos confortáveis como algodão e jeans",
            "Combine cores neutras com uma peça colorida para destaque",
            "Acessórios simples complementam bem o visual casual"
        ]
    },
    trabalho: {
        nome: "Trabalho",
        icone: "fa-briefcase",
        descricao: "Roupas formais ou semi-formais adequadas para ambiente profissional.",
        estilos: ['formal', 'elegante'],
        cores: ['preto', 'branco', 'azul', 'cinza'],
        estacao: 'todas',
        dicas: [
            "Opte por cores sóbrias e neutras",
            "Evite peças muito justas ou decotadas",
            "Sapatos bem conservados são essenciais para o visual profissional"
        ]
    },
    esporte: {
        nome: "Desporto",
        icone: "fa-running",
        descricao: "Roupas confortáveis e funcionais para atividades físicas.",
        estilos: ['esportivo'],
        cores: ['todas'],
        estacao: 'todas',
        dicas: [
            "Priorize tecidos que absorvem o suor",
            "Escolha calçados adequados para o tipo de atividade",
            "Camadas leves são ideais para regular a temperatura corporal"
        ]
    },
    festa: {
        nome: "Festa",
        icone: "fa-glass-cheers",
        descricao: "Roupas elegantes para eventos sociais, festas e celebrações.",
        estilos: ['elegante', 'formal'],
        cores: ['preto', 'vermelho', 'azul', 'roxo', 'rosa'],
        estacao: 'todas',
        dicas: [
            "Um acessório marcante pode transformar o visual",
            "Considere o tipo de festa ao escolher o nível de formalidade",
            "Sapatos confortáveis são importantes para festas longas"
        ]
    },
    verao: {
        nome: "Verão",
        icone: "fa-sun",
        descricao: "Roupas leves e frescas para dias quentes.",
        estilos: ['casual', 'esportivo'],
        cores: ['branco', 'azul', 'verde', 'amarelo', 'rosa', 'laranja'],
        estacao: 'verao',
        dicas: [
            "Tecidos leves como linho e algodão são ideais",
            "Cores claras refletem o calor e mantêm-no mais fresco",
            "Proteja-se do sol com chapéus e óculos de sol"
        ]
    },
    inverno: {
        nome: "Inverno",
        icone: "fa-snowflake",
        descricao: "Roupas quentes e aconchegantes para dias frios.",
        estilos: ['casual', 'formal', 'elegante'],
        cores: ['preto', 'azul', 'vermelho', 'marrom', 'cinza'],
        estacao: 'inverno',
        dicas: [
            "Camadas são essenciais para regular a temperatura",
            "Tecidos como lã e flanela oferecem bom isolamento térmico",
            "Um bom casaco é o investimento mais importante para o inverno"
        ]
    },
    chuva: {
        nome: "Chuva",
        icone: "fa-cloud-rain",
        descricao: "Roupas adequadas para dias chuvosos, protegendo da humidade.",
        estilos: ['casual', 'esportivo'],
        cores: ['preto', 'azul', 'cinza'],
        estacao: 'todas',
        dicas: [
            "Tecidos impermeáveis ou de secagem rápida são ideais",
            "Evite jeans e outros tecidos que absorvem muita água",
            "Calçado impermeável é essencial para manter os pés secos"
        ]
    },
    encontro: {
        nome: "Encontro",
        icone: "fa-heart",
        descricao: "Roupas que transmitem confiança e estilo para encontros românticos.",
        estilos: ['elegante', 'casual'],
        cores: ['preto', 'azul', 'vermelho', 'branco'],
        estacao: 'todas',
        dicas: [
            "Vista-se de acordo com o local do encontro",
            "Use uma peça que destaque a sua personalidade",
            "O conforto é importante para se sentir confiante"
        ]
    }
};

// Função para inicializar a tela de situações
function initializeSituationsScreen() {
    const situationsList = document.querySelector('.situations-list');
    
    // Limpar a lista atual
    situationsList.innerHTML = '';
    
    // Adicionar cada situação à lista
    for (const [key, situation] of Object.entries(situationDetails)) {
        const situationItem = document.createElement('div');
        situationItem.className = 'situation-item';
        situationItem.setAttribute('data-situation', key);
        situationItem.innerHTML = `
            <i class="fas ${situation.icone}"></i>
            <span>${situation.nome}</span>
        `;
        
        // Adicionar evento de clique
        situationItem.addEventListener('click', function() {
            showSituationDetail(key);
        });
        
        situationsList.appendChild(situationItem);
    }
}

// Função para mostrar detalhes da situação
function showSituationDetail(situationKey) {
    const situation = situationDetails[situationKey];
    
    // Criar modal de detalhes
    const modal = document.createElement('div');
    modal.className = 'situation-modal';
    
    // Criar conteúdo do modal
    let dicas = '';
    situation.dicas.forEach(dica => {
        dicas += `<li>${dica}</li>`;
    });
    
    modal.innerHTML = `
        <div class="situation-modal-content">
            <div class="situation-modal-header">
                <h3><i class="fas ${situation.icone}"></i> ${situation.nome}</h3>
                <button class="close-button"><i class="fas fa-times"></i></button>
            </div>
            <div class="situation-modal-body">
                <p class="situation-description">${situation.descricao}</p>
                <div class="situation-details">
                    <div class="situation-detail">
                        <h4>Estilos</h4>
                        <p>${situation.estilos.map(capitalizeFirstLetter).join(', ')}</p>
                    </div>
                    <div class="situation-detail">
                        <h4>Cores</h4>
                        <p>${situation.cores.includes('todas') ? 'Todas as cores' : situation.cores.map(capitalizeFirstLetter).join(', ')}</p>
                    </div>
                    <div class="situation-detail">
                        <h4>Estação</h4>
                        <p>${situation.estacao === 'todas' ? 'Todas as estações' : capitalizeFirstLetter(situation.estacao)}</p>
                    </div>
                </div>
                <div class="situation-tips">
                    <h4>Dicas</h4>
                    <ul>${dicas}</ul>
                </div>
            </div>
            <div class="situation-modal-footer">
                <button class="generate-button" id="generate-situation-outfit">
                    <i class="fas fa-magic"></i> Gerar Combinações
                </button>
            </div>
        </div>
    `;
    
    // Adicionar modal ao corpo do documento
    document.body.appendChild(modal);
    
    // Configurar evento de fechar
    modal.querySelector('.close-button').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Configurar evento de gerar combinações
    modal.querySelector('#generate-situation-outfit').addEventListener('click', function() {
        document.body.removeChild(modal);
        generateSituationCombination(situationKey);
    });
    
    // Fechar modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Animar entrada do modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Função para filtrar o guarda-roupa por situação
function filterWardrobeByCategory(category, situationKey) {
    const situation = situationDetails[situationKey];
    
    return wardrobe[category].filter(item => {
        // Verificar estilo
        const styleMatch = situation.estilos.includes(item.style);
        
        // Verificar cor
        const colorMatch = situation.cores.includes('todas') || situation.cores.includes(item.color);
        
        // Verificar estação
        const seasonMatch = situation.estacao === 'todas' || 
                           item.season === 'todas' || 
                           item.season === situation.estacao;
        
        return styleMatch && colorMatch && seasonMatch;
    });
}

// Função para mostrar o guarda-roupa filtrado por situação
function showWardrobeForSituation(situationKey) {
    // Navegar para o guarda-roupa
    navigateTo('wardrobe-screen');
    
    // Obter a situação
    const situation = situationDetails[situationKey];
    
    // Atualizar o título
    document.querySelector('#wardrobe-screen .screen-header h2').textContent = 
        `Roupas para ${situation.nome}`;
    
    // Adicionar classe de filtro ao guarda-roupa
    document.getElementById('wardrobe-items').classList.add('filtered');
    
    // Adicionar banner de filtro
    const filterBanner = document.createElement('div');
    filterBanner.className = 'filter-banner';
    filterBanner.innerHTML = `
        <span>Filtrado para: ${situation.nome}</span>
        <button class="clear-filter-button"><i class="fas fa-times"></i></button>
    `;
    
    // Adicionar banner antes da grade de itens
    const wardrobeContainer = document.getElementById('wardrobe-items').parentNode;
    wardrobeContainer.insertBefore(filterBanner, document.getElementById('wardrobe-items'));
    
    // Configurar evento para limpar filtro
    filterBanner.querySelector('.clear-filter-button').addEventListener('click', function() {
        clearSituationFilter();
    });
    
    // Exibir itens filtrados da categoria ativa
    const activeCategory = document.querySelector('.tab.active').dataset.category;
    displayFilteredWardrobeItems(activeCategory, situationKey);
    
    // Atualizar os tabs para usar a função de exibição filtrada
    document.querySelectorAll('.tab').forEach(tab => {
        const originalClickHandler = tab.onclick;
        tab.onclick = function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            displayFilteredWardrobeItems(category, situationKey);
        };
        
        // Armazenar o manipulador original para restaurar depois
        tab.dataset.originalHandler = originalClickHandler;
    });
}

// Função para exibir itens do guarda-roupa filtrados por situação
function displayFilteredWardrobeItems(category, situationKey) {
    const container = document.getElementById('wardrobe-items');
    container.innerHTML = '';
    
    // Filtrar itens pela situação
    const filteredItems = filterWardrobeByCategory(category, situationKey);
    
    if (filteredItems.length === 0) {
        container.innerHTML = `
            <div class="empty-category">
                <p>Não há itens para esta situação na categoria ${category}.</p>
                <button class="add-item-button-inline" onclick="navigateTo('upload-screen')">
                    <i class="fas fa-plus"></i> Adicionar Item
                </button>
            </div>
        `;
        return;
    }
    
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'wardrobe-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${category}">
            <div class="item-actions">
                <button class="item-action-button combine-button" title="Gerar combinações com este item">
                    <i class="fas fa-magic"></i>
                </button>
                <button class="item-action-button delete-button" title="Remover item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        itemElement.dataset.id = item.id;
        
        // Configurar evento para mostrar detalhes do item
        itemElement.querySelector('img').addEventListener('click', function() {
            showItemDetails(item);
        });
        
        // Configurar evento para gerar combinações a partir do item
        itemElement.querySelector('.combine-button').addEventListener('click', function(e) {
            e.stopPropagation();
            generateCombinationsFromItem(item, category);
        });
        
        // Configurar evento para remover o item
        itemElement.querySelector('.delete-button').addEventListener('click', function(e) {
            e.stopPropagation();
            removeItem(item.id, category);
        });
        
        container.appendChild(itemElement);
    });
}

// Função para limpar o filtro de situação
function clearSituationFilter() {
    // Restaurar o título original
    document.querySelector('#wardrobe-screen .screen-header h2').textContent = 'Meu Guarda-Roupa';
    
    // Remover a classe de filtro
    document.getElementById('wardrobe-items').classList.remove('filtered');
    
    // Remover o banner de filtro
    const filterBanner = document.querySelector('.filter-banner');
    if (filterBanner) {
        filterBanner.parentNode.removeChild(filterBanner);
    }
    
    // Restaurar os manipuladores de eventos originais dos tabs
    document.querySelectorAll('.tab').forEach(tab => {
        const originalHandler = tab.dataset.originalHandler;
        if (originalHandler) {
            tab.onclick = originalHandler;
        } else {
            tab.onclick = function() {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const category = this.dataset.category;
                displayWardrobeItems(category);
            };
        }
    });
    
    // Exibir todos os itens da categoria ativa
    const activeCategory = document.querySelector('.tab.active').dataset.category;
    displayWardrobeItems(activeCategory);
}

// Adicionar estilos para os elementos de situação
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a tela de situações
    initializeSituationsScreen();
    
    // Criar elemento de estilo
    const style = document.createElement('style');
    style.textContent = `
        .situation-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .situation-modal.show {
            opacity: 1;
        }
        
        .situation-modal-content {
            width: 90%;
            max-width: 350px;
            background-color: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: scale(0.9);
            transition: transform 0.3s;
        }
        
        .situation-modal.show .situation-modal-content {
            transform: scale(1);
        }
        
        .situation-modal-header {
            padding: 15px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .situation-modal-header h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        
        .situation-modal-header .close-button {
            background: none;
            border: none;
            font-size: 16px;
            color: #999;
        }
        
        .situation-modal-body {
            padding: 15px;
        }
        
        .situation-description {
            margin-bottom: 15px;
            color: #666;
        }
        
        .situation-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .situation-detail {
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 8px;
        }
        
        .situation-detail h4 {
            margin: 0 0 5px 0;
            font-size: 14px;
            color: #333;
        }
        
        .situation-detail p {
            margin: 0;
            font-size: 12px;
            color: #666;
        }
        
        .situation-tips {
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 8px;
        }
        
        .situation-tips h4 {
            margin: 0 0 5px 0;
            font-size: 14px;
            color: #333;
        }
        
        .situation-tips ul {
            margin: 0;
            padding-left: 20px;
            font-size: 12px;
            color: #666;
        }
        
        .situation-modal-footer {
            padding: 15px;
            background-color: #f8f8f8;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: center;
        }
        
        .filter-banner {
            background-color: #f0f8ff;
            padding: 10px 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #007aff;
        }
        
        .clear-filter-button {
            background: none;
            border: none;
            color: #999;
            font-size: 16px;
        }
        
        .empty-category {
            text-align: center;
            padding: 30px 15px;
            color: #999;
        }
        
        .add-item-button-inline {
            background-color: #007aff;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 15px;
            margin-top: 15px;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
    `;
    
    // Adicionar ao cabeçalho
    document.head.appendChild(style);
    
    // Atualizar a função de geração de combinação para situação
    window.generateSituationCombination = function(situationKey) {
        // Criar uma instância do gerador de combinações
        const outfitGenerator = new OutfitGenerator(wardrobe);
        
        // Gerar combinações para a situação
        combinations = outfitGenerator.generateSituationCombinations(situationKey, 3);
        
        // Se não houver combinações suficientes, mostrar mensagem
        if (combinations.length === 0) {
            showNotification('Não foi possível gerar combinações para esta situação. Adicione mais roupas compatíveis.');
            
            // Mostrar o guarda-roupa filtrado para esta situação
            showWardrobeForSituation(situationKey);
            return;
        }
        
        // Navegar para a tela de combinações
        navigateTo('combinations-screen');
    };
    
    // Atualizar os itens de situação para usar a nova função de detalhes
    document.querySelectorAll('.situation-item').forEach(item => {
        item.onclick = function() {
            const situationKey = this.getAttribute('data-situation') || 
                                this.textContent.trim().toLowerCase();
            showSituationDetail(situationKey);
        };
    });
});
