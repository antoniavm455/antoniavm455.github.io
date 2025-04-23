// Dados de exemplo para o aplicativo
let wardrobe = {
    camisas: [],
    calcas: [],
    sapatos: [],
    acessorios: []
};

let combinations = [];
let favorites = [];

// Imagens de exemplo para demonstração
const sampleImages = {
    camisas: [
        'https://cdn-icons-png.flaticon.com/512/2503/2503380.png',
        'https://cdn-icons-png.flaticon.com/512/2503/2503381.png',
        'https://cdn-icons-png.flaticon.com/512/2589/2589903.png',
        'https://cdn-icons-png.flaticon.com/512/5783/5783203.png'
    ],
    calcas: [
        'https://cdn-icons-png.flaticon.com/512/863/863684.png',
        'https://cdn-icons-png.flaticon.com/512/2405/2405604.png',
        'https://cdn-icons-png.flaticon.com/512/9431/9431166.png',
        'https://cdn-icons-png.flaticon.com/512/2405/2405432.png'
    ],
    sapatos: [
        'https://cdn-icons-png.flaticon.com/512/1785/1785348.png',
        'https://cdn-icons-png.flaticon.com/512/1573/1573278.png',
        'https://cdn-icons-png.flaticon.com/512/2589/2589903.png',
        'https://cdn-icons-png.flaticon.com/512/2405/2405613.png'
    ],
    acessorios: [
        'https://cdn-icons-png.flaticon.com/512/1867/1867565.png',
        'https://cdn-icons-png.flaticon.com/512/2405/2405612.png',
        'https://cdn-icons-png.flaticon.com/512/2405/2405611.png',
        'https://cdn-icons-png.flaticon.com/512/2405/2405610.png'
    ]
};

// Cores para combinações
const colors = {
    preto: { combinaCom: ['branco', 'vermelho', 'azul', 'verde', 'amarelo', 'roxo', 'rosa', 'laranja', 'cinza'] },
    branco: { combinaCom: ['preto', 'azul', 'vermelho', 'verde', 'roxo', 'rosa', 'laranja', 'marrom', 'cinza'] },
    azul: { combinaCom: ['branco', 'preto', 'cinza', 'marrom', 'verde', 'vermelho'] },
    vermelho: { combinaCom: ['branco', 'preto', 'cinza', 'azul', 'amarelo'] },
    verde: { combinaCom: ['branco', 'preto', 'cinza', 'marrom', 'azul', 'amarelo'] },
    amarelo: { combinaCom: ['preto', 'azul', 'verde', 'roxo', 'cinza'] },
    roxo: { combinaCom: ['branco', 'preto', 'amarelo', 'cinza', 'rosa'] },
    rosa: { combinaCom: ['branco', 'preto', 'cinza', 'roxo', 'azul'] },
    laranja: { combinaCom: ['branco', 'preto', 'azul', 'verde', 'cinza'] },
    marrom: { combinaCom: ['branco', 'azul', 'verde', 'cinza', 'amarelo'] },
    cinza: { combinaCom: ['preto', 'branco', 'azul', 'vermelho', 'verde', 'roxo', 'rosa', 'laranja', 'marrom'] }
};

// Estilos para combinações
const styles = {
    casual: { combinaCom: ['casual', 'esportivo'] },
    formal: { combinaCom: ['formal', 'elegante'] },
    esportivo: { combinaCom: ['esportivo', 'casual'] },
    elegante: { combinaCom: ['elegante', 'formal'] }
};

// Situações e regras
const situations = {
    casual: {
        estilos: ['casual', 'esportivo'],
        cores: ['todas']
    },
    trabalho: {
        estilos: ['formal', 'elegante'],
        cores: ['preto', 'branco', 'azul', 'cinza']
    },
    esporte: {
        estilos: ['esportivo'],
        cores: ['todas']
    },
    festa: {
        estilos: ['elegante', 'formal'],
        cores: ['preto', 'vermelho', 'azul', 'roxo', 'rosa']
    },
    verao: {
        estilos: ['casual', 'esportivo'],
        cores: ['branco', 'azul', 'verde', 'amarelo', 'rosa', 'laranja'],
        estacao: 'verao'
    },
    inverno: {
        estilos: ['casual', 'formal', 'elegante'],
        cores: ['preto', 'azul', 'vermelho', 'marrom', 'cinza'],
        estacao: 'inverno'
    },
    chuva: {
        estilos: ['casual', 'esportivo'],
        cores: ['preto', 'azul', 'cinza'],
        estacao: 'todas'
    },
    encontro: {
        estilos: ['elegante', 'casual'],
        cores: ['preto', 'azul', 'vermelho', 'branco'],
        estacao: 'todas'
    }
};

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados de exemplo
    loadSampleData();
    
    // Configurar eventos
    setupEventListeners();
    
    // Mostrar tela inicial
    navigateTo('home-screen');
});

// Carregar dados de exemplo
function loadSampleData() {
    // Adicionar roupas de exemplo
    for (let category in sampleImages) {
        sampleImages[category].forEach((imgSrc, index) => {
            const colors = ['preto', 'branco', 'azul', 'vermelho', 'verde', 'amarelo', 'roxo', 'rosa', 'laranja', 'marrom', 'cinza'];
            const styles = ['casual', 'formal', 'esportivo', 'elegante'];
            const seasons = ['todas', 'verao', 'inverno', 'meia-estacao'];
            
            wardrobe[category].push({
                id: `${category}-${index}`,
                image: imgSrc,
                color: colors[Math.floor(Math.random() * colors.length)],
                style: styles[Math.floor(Math.random() * styles.length)],
                season: seasons[Math.floor(Math.random() * seasons.length)]
            });
        });
    }
    
    // Gerar algumas combinações iniciais
    generateCombinations();
}

// Configurar event listeners
function setupEventListeners() {
    // Tabs do guarda-roupa
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            displayWardrobeItems(category);
        });
    });
    
    // Área de upload
    const uploadArea = document.getElementById('upload-area');
    const photoUpload = document.getElementById('photo-upload');
    
    uploadArea.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                document.getElementById('preview-image').src = e.target.result;
                document.getElementById('upload-area').classList.add('hidden');
                document.getElementById('item-details').classList.remove('hidden');
            }
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

// Navegação entre telas
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    document.getElementById(screenId).classList.remove('hidden');
    
    // Atualizar conteúdo da tela
    if (screenId === 'wardrobe-screen') {
        const activeCategory = document.querySelector('.tab.active').dataset.category;
        displayWardrobeItems(activeCategory);
    } else if (screenId === 'combinations-screen') {
        displayCombinations();
    } else if (screenId === 'favorites-screen') {
        displayFavorites();
    }
    
    // Atualizar barra de navegação
    updateNavBar(screenId);
}

// Atualizar barra de navegação
function updateNavBar(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (screenId === 'home-screen') {
        document.querySelector('.nav-item:nth-child(1)').classList.add('active');
    } else if (screenId === 'wardrobe-screen') {
        document.querySelector('.nav-item:nth-child(2)').classList.add('active');
    } else if (screenId === 'combinations-screen') {
        document.querySelector('.nav-item:nth-child(3)').classList.add('active');
    } else if (screenId === 'situations-screen') {
        document.querySelector('.nav-item:nth-child(4)').classList.add('active');
    }
}

// Exibir itens do guarda-roupa
function displayWardrobeItems(category) {
    const container = document.getElementById('wardrobe-items');
    container.innerHTML = '';
    
    wardrobe[category].forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'wardrobe-item';
        itemElement.innerHTML = `<img src="${item.image}" alt="${category}">`;
        itemElement.dataset.id = item.id;
        
        itemElement.addEventListener('click', function() {
            showItemDetails(item);
        });
        
        container.appendChild(itemElement);
    });
}

// Mostrar detalhes do item
function showItemDetails(item) {
    // Implementação futura
    console.log('Detalhes do item:', item);
}

// Salvar item
function saveItem() {
    const category = document.getElementById('item-category').value;
    const color = document.getElementById('item-color').value;
    const style = document.getElementById('item-style').value;
    const season = document.getElementById('item-season').value;
    const image = document.getElementById('preview-image').src;
    
    const newItem = {
        id: `${category}-${wardrobe[category].length}`,
        image: image,
        color: color,
        style: style,
        season: season
    };
    
    wardrobe[category].push(newItem);
    
    // Resetar formulário
    document.getElementById('upload-area').classList.remove('hidden');
    document.getElementById('item-details').classList.add('hidden');
    document.getElementById('photo-upload').value = '';
    
    // Voltar para o guarda-roupa
    navigateTo('wardrobe-screen');
    
    // Atualizar a tab ativa para a categoria do item adicionado
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.dataset.category === category) {
            tab.click();
        }
    });
}

// Gerar combinações
function generateCombinations() {
    combinations = [];
    
    // Verificar se há itens suficientes
    if (wardrobe.camisas.length === 0 || wardrobe.calcas.length === 0 || wardrobe.sapatos.length === 0) {
        // Se não houver itens suficientes, usar os dados de exemplo
        if (wardrobe.camisas.length === 0) loadSampleCategory('camisas');
        if (wardrobe.calcas.length === 0) loadSampleCategory('calcas');
        if (wardrobe.sapatos.length === 0) loadSampleCategory('sapatos');
    }
    
    // Gerar 5 combinações aleatórias
    for (let i = 0; i < 5; i++) {
        const camisa = getRandomItem('camisas');
        const calca = getRandomItem('calcas');
        const sapato = getRandomItem('sapatos');
        const acessorio = wardrobe.acessorios.length > 0 ? getRandomItem('acessorios') : null;
        
        // Verificar compatibilidade de cores e estilos
        if (isCompatible(camisa, calca) && isCompatible(calca, sapato)) {
            const combination = {
                id: `combination-${i}`,
                items: [camisa, calca, sapato],
                situation: 'casual'
            };
            
            if (acessorio) {
                combination.items.push(acessorio);
            }
            
            combinations.push(combination);
        } else {
            // Se não for compatível, tentar novamente
            i--;
        }
    }
    
    // Exibir combinações
    displayCombinations();
}

// Carregar categoria de exemplo
function loadSampleCategory(category) {
    sampleImages[category].forEach((imgSrc, index) => {
        const colors = ['preto', 'branco', 'azul', 'vermelho', 'verde', 'amarelo', 'roxo', 'rosa', 'laranja', 'marrom', 'cinza'];
        const styles = ['casual', 'formal', 'esportivo', 'elegante'];
        const seasons = ['todas', 'verao', 'inverno', 'meia-estacao'];
        
        wardrobe[category].push({
            id: `${category}-${index}`,
            image: imgSrc,
            color: colors[Math.floor(Math.random() * colors.length)],
            style: styles[Math.floor(Math.random() * styles.length)],
            season: seasons[Math.floor(Math.random() * seasons.length)]
        });
    });
}

// Obter item aleatório
function getRandomItem(category) {
    const items = wardrobe[category];
    return items[Math.floor(Math.random() * items.length)];
}

// Verificar compatibilidade
function isCompatible(item1, item2) {
    // Verificar compatibilidade de cores
    const color1 = item1.color;
    const color2 = item2.color;
    
    if (!colors[color1] || !colors[color2]) return true; // Se não tiver informação de cor, considerar compatível
    
    const colorCompatible = colors[color1].combinaCom.includes(color2) || colors[color2].combinaCom.includes(color1);
    
    // Verificar compatibilidade de estilos
    const style1 = item1.style;
    const style2 = item2.style;
    
    if (!styles[style1] || !styles[style2]) return true; // Se não tiver informação de estilo, considerar compatível
    
    const styleCompatible = styles[style1].combinaCom.includes(style2) || styles[style2].combinaCom.includes(style1);
    
    return colorCompatible && styleCompatible;
}

// Exibir combinações
function displayCombinations() {
    const container = document.getElementById('combinations-container');
    container.innerHTML = '';
    
    combinations.forEach((combination, index) => {
        const card = document.createElement('div');
        card.className = 'combination-card';
        
        let itemsHTML = '';
        combination.items.forEach(item => {
            itemsHTML += `<div class="combination-item"><img src="${item.image}" alt=""></div>`;
        });
        
        card.innerHTML = `
            <div class="combination-title">Combinação ${index + 1}</div>
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

// Adicionar aos favoritos
function addToFavorites(index) {
    const combination = combinations[index];
    
    // Verificar se já está nos favoritos
    const alreadyFavorite = favorites.some(fav => fav.id === combination.id);
    
    if (!alreadyFavorite) {
        favorites.push(combination);
        displayFavorites();
    }
}

// Exibir favoritos
function displayFavorites() {
    const container = document.getElementById('favorites-container');
    container.innerHTML = '';
    
    if (favorites.length === 0) {
        container.innerHTML = '<p class="empty-message">Ainda não tem combinações favoritas.</p>';
        return;
    }
    
    favorites.forEach((combination, index) => {
        const card = document.createElement('div');
        card.className = 'combination-card';
        
        let itemsHTML = '';
        combination.items.forEach(item => {
            itemsHTML += `<div class="combination-item"><img src="${item.image}" alt=""></div>`;
        });
        
        card.innerHTML = `
            <div class="combination-title">Favorito ${index + 1}</div>
            <div class="combination-items">${itemsHTML}</div>
            <div class="combination-actions">
                <button class="combination-button" onclick="removeFromFavorites(${index})">
                    <i class="fas fa-heart"></i> Remover
                </button>
                <button class="combination-button">
                    <i class="fas fa-share-alt"></i> Partilhar
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Remover dos favoritos
function removeFromFavorites(index) {
    favorites.splice(index, 1);
    displayFavorites();
}

// Gerar combinação rápida
function generateRandomCombination() {
    generateCombinations();
    navigateTo('combinations-screen');
}

// Gerar combinação para situação específica
function generateSituationCombination(situationType) {
    combinations = [];
    
    // Verificar se há itens suficientes
    if (wardrobe.camisas.length === 0 || wardrobe.calcas.length === 0 || wardrobe.sapatos.length === 0) {
        // Se não houver itens suficientes, usar os dados de exemplo
        if (wardrobe.camisas.length === 0) loadSampleCategory('camisas');
        if (wardrobe.calcas.length === 0) loadSampleCategory('calcas');
        if (wardrobe.sapatos.length === 0) loadSampleCategory('sapatos');
    }
    
    const situation = situations[situationType];
    
    // Filtrar itens adequados para a situação
    const filteredCamisas = filterItemsForSituation(wardrobe.camisas, situation);
    const filteredCalcas = filterItemsForSituation(wardrobe.calcas, situation);
    const filteredSapatos = filterItemsForSituation(wardrobe.sapatos, situation);
    const filteredAcessorios = wardrobe.acessorios.length > 0 ? filterItemsForSituation(wardrobe.acessorios, situation) : [];
    
    // Gerar 3 combinações para a situação
    for (let i = 0; i < 3; i++) {
        if (filteredCamisas.length === 0 || filteredCalcas.length === 0 || filteredSapatos.length === 0) {
            break; // Não há itens suficientes para esta situação
        }
        
        const camisa = filteredCamisas[Math.floor(Math.random() * filteredCamisas.length)];
        const calca = filteredCalcas[Math.floor(Math.random() * filteredCalcas.length)];
        const sapato = filteredSapatos[Math.floor(Math.random() * filteredSapatos.length)];
        const acessorio = filteredAcessorios.length > 0 ? 
            filteredAcessorios[Math.floor(Math.random() * filteredAcessorios.length)] : null;
        
        const combination = {
            id: `${situationType}-${i}`,
            items: [camisa, calca, sapato],
            situation: situationType
        };
        
        if (acessorio) {
            combination.items.push(acessorio);
        }
        
        combinations.push(combination);
    }
    
    // Exibir combinações
    navigateTo('combinations-screen');
}

// Filtrar itens para situação
function filterItemsForSituation(items, situation) {
    return items.filter(item => {
        // Verificar estilo
        const styleMatch = situation.estilos.includes(item.style);
        
        // Verificar cor
        const colorMatch = situation.cores.includes('todas') || situation.cores.includes(item.color);
        
        // Verificar estação
        const seasonMatch = !situation.estacao || situation.estacao === 'todas' || 
                           item.season === 'todas' || item.season === situation.estacao;
        
        return styleMatch && colorMatch && seasonMatch;
    });
}
