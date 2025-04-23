// Integração do algoritmo de combinação com a interface do aplicativo

// Atualizar a função de geração de combinações para usar o novo algoritmo
function generateCombinations() {
    // Criar uma instância do gerador de combinações
    const outfitGenerator = new OutfitGenerator(wardrobe);
    
    // Gerar combinações aleatórias
    combinations = outfitGenerator.generateRandomCombinations(5);
    
    // Exibir combinações
    displayCombinations();
}

// Atualizar a função de geração de combinação rápida
function generateRandomCombination() {
    // Criar uma instância do gerador de combinações
    const outfitGenerator = new OutfitGenerator(wardrobe);
    
    // Gerar uma combinação aleatória
    combinations = outfitGenerator.generateRandomCombinations(1);
    
    // Navegar para a tela de combinações
    navigateTo('combinations-screen');
}

// Atualizar a função de geração de combinação para situação específica
function generateSituationCombination(situationType) {
    // Criar uma instância do gerador de combinações
    const outfitGenerator = new OutfitGenerator(wardrobe);
    
    // Gerar combinações para a situação
    combinations = outfitGenerator.generateSituationCombinations(situationType, 3);
    
    // Navegar para a tela de combinações
    navigateTo('combinations-screen');
}

// Função para gerar combinações a partir de um item específico
function generateCombinationsFromItem(item, category) {
    // Criar uma instância do gerador de combinações
    const outfitGenerator = new OutfitGenerator(wardrobe);
    
    // Gerar combinações a partir do item
    combinations = outfitGenerator.generateCombinationsFromItem(item, category, 3);
    
    // Navegar para a tela de combinações
    navigateTo('combinations-screen');
}

// Atualizar a função de exibição de combinações para mostrar pontuação
function displayCombinations() {
    const container = document.getElementById('combinations-container');
    container.innerHTML = '';
    
    if (combinations.length === 0) {
        container.innerHTML = '<p class="empty-message">Não foi possível gerar combinações. Adicione mais roupas ao seu guarda-roupa.</p>';
        return;
    }
    
    combinations.forEach((combination, index) => {
        const card = document.createElement('div');
        card.className = 'combination-card';
        
        let itemsHTML = '';
        combination.items.forEach(item => {
            itemsHTML += `<div class="combination-item"><img src="${item.image}" alt=""></div>`;
        });
        
        // Determinar o título da combinação
        let title = `Combinação ${index + 1}`;
        if (combination.situation) {
            title = `${title} - ${capitalizeFirstLetter(combination.situation)}`;
        }
        
        // Adicionar indicador de qualidade baseado na pontuação
        let qualityIndicator = '';
        if (combination.score) {
            const qualityClass = getQualityClass(combination.score);
            qualityIndicator = `<span class="quality-indicator ${qualityClass}"></span>`;
        }
        
        card.innerHTML = `
            <div class="combination-title">${title} ${qualityIndicator}</div>
            <div class="combination-items">${itemsHTML}</div>
            <div class="combination-actions">
                <button class="combination-button" onclick="addToFavorites(${index})">
                    <i class="far fa-heart"></i> Favorito
                </button>
                <button class="combination-button">
                    <i class="fas fa-share-alt"></i> Partilhar
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Função para capitalizar a primeira letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para determinar a classe de qualidade com base na pontuação
function getQualityClass(score) {
    if (score >= 25) return 'quality-excellent';
    if (score >= 20) return 'quality-good';
    if (score >= 15) return 'quality-average';
    return 'quality-poor';
}

// Atualizar a função de exibição de itens do guarda-roupa para permitir gerar combinações a partir de um item
function displayWardrobeItems(category) {
    const container = document.getElementById('wardrobe-items');
    container.innerHTML = '';
    
    wardrobe[category].forEach(item => {
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

// Função para remover um item do guarda-roupa
function removeItem(itemId, category) {
    // Confirmar remoção
    if (!confirm('Tem certeza que deseja remover este item?')) {
        return;
    }
    
    // Encontrar o índice do item
    const itemIndex = wardrobe[category].findIndex(item => item.id === itemId);
    
    // Remover o item se encontrado
    if (itemIndex !== -1) {
        wardrobe[category].splice(itemIndex, 1);
        
        // Salvar o guarda-roupa atualizado
        saveWardrobeToStorage();
        
        // Atualizar a exibição
        displayWardrobeItems(category);
        
        // Mostrar notificação
        showNotification('Item removido com sucesso!');
    }
}

// Adicionar estilos para os indicadores de qualidade
document.addEventListener('DOMContentLoaded', function() {
    // Criar elemento de estilo
    const style = document.createElement('style');
    style.textContent = `
        .quality-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-left: 5px;
        }
        
        .quality-excellent {
            background-color: #34c759;
        }
        
        .quality-good {
            background-color: #007aff;
        }
        
        .quality-average {
            background-color: #ffcc00;
        }
        
        .quality-poor {
            background-color: #ff3b30;
        }
        
        .item-actions {
            position: absolute;
            bottom: 5px;
            right: 5px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.2s;
        }
        
        .wardrobe-item:hover .item-actions {
            opacity: 1;
        }
        
        .item-action-button {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333;
            font-size: 14px;
        }
        
        .combine-button {
            color: #007aff;
        }
        
        .delete-button {
            color: #ff3b30;
        }
    `;
    
    // Adicionar ao cabeçalho
    document.head.appendChild(style);
});
