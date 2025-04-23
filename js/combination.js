// Algoritmo de Combinação de Roupas
// Este arquivo contém a lógica avançada para gerar combinações de roupas

// Regras de combinação de cores
const colorRules = {
    // Cores neutras combinam com praticamente tudo
    preto: {
        combinaCom: ['preto', 'branco', 'cinza', 'azul', 'vermelho', 'verde', 'amarelo', 'roxo', 'rosa', 'laranja', 'marrom'],
        tipo: 'neutro',
        intensidade: 'escuro'
    },
    branco: {
        combinaCom: ['preto', 'branco', 'cinza', 'azul', 'vermelho', 'verde', 'amarelo', 'roxo', 'rosa', 'laranja', 'marrom'],
        tipo: 'neutro',
        intensidade: 'claro'
    },
    cinza: {
        combinaCom: ['preto', 'branco', 'cinza', 'azul', 'vermelho', 'verde', 'amarelo', 'roxo', 'rosa', 'laranja', 'marrom'],
        tipo: 'neutro',
        intensidade: 'médio'
    },
    
    // Cores primárias
    azul: {
        combinaCom: ['preto', 'branco', 'cinza', 'azul', 'laranja', 'amarelo', 'verde', 'marrom'],
        tipo: 'primária',
        intensidade: 'médio',
        complementar: 'laranja'
    },
    vermelho: {
        combinaCom: ['preto', 'branco', 'cinza', 'vermelho', 'verde', 'azul', 'amarelo'],
        tipo: 'primária',
        intensidade: 'forte',
        complementar: 'verde'
    },
    amarelo: {
        combinaCom: ['preto', 'branco', 'cinza', 'amarelo', 'roxo', 'azul', 'verde', 'marrom'],
        tipo: 'primária',
        intensidade: 'forte',
        complementar: 'roxo'
    },
    
    // Cores secundárias
    verde: {
        combinaCom: ['preto', 'branco', 'cinza', 'verde', 'vermelho', 'azul', 'amarelo', 'marrom'],
        tipo: 'secundária',
        intensidade: 'médio',
        complementar: 'vermelho'
    },
    roxo: {
        combinaCom: ['preto', 'branco', 'cinza', 'roxo', 'amarelo', 'rosa', 'azul'],
        tipo: 'secundária',
        intensidade: 'forte',
        complementar: 'amarelo'
    },
    laranja: {
        combinaCom: ['preto', 'branco', 'cinza', 'laranja', 'azul', 'verde', 'marrom'],
        tipo: 'secundária',
        intensidade: 'forte',
        complementar: 'azul'
    },
    
    // Outras cores
    rosa: {
        combinaCom: ['preto', 'branco', 'cinza', 'rosa', 'roxo', 'azul', 'verde'],
        tipo: 'terciária',
        intensidade: 'médio'
    },
    marrom: {
        combinaCom: ['preto', 'branco', 'cinza', 'marrom', 'azul', 'verde', 'amarelo', 'laranja'],
        tipo: 'neutro',
        intensidade: 'escuro'
    }
};

// Regras de combinação de estilos
const styleRules = {
    casual: {
        combinaCom: ['casual', 'esportivo'],
        formalidade: 'baixa',
        situacoes: ['casual', 'lazer', 'compras', 'passeio', 'cinema', 'verao', 'inverno', 'chuva']
    },
    formal: {
        combinaCom: ['formal', 'elegante'],
        formalidade: 'alta',
        situacoes: ['trabalho', 'reuniao', 'entrevista', 'festa', 'jantar', 'evento']
    },
    esportivo: {
        combinaCom: ['esportivo', 'casual'],
        formalidade: 'muito baixa',
        situacoes: ['esporte', 'academia', 'corrida', 'casual', 'lazer', 'verao']
    },
    elegante: {
        combinaCom: ['elegante', 'formal'],
        formalidade: 'alta',
        situacoes: ['festa', 'jantar', 'evento', 'encontro', 'trabalho']
    }
};

// Regras de combinação por estação
const seasonRules = {
    verao: {
        tecidos: ['leve', 'algodão', 'linho'],
        cores: ['branco', 'azul', 'verde', 'amarelo', 'rosa', 'laranja'],
        evitar: ['preto', 'marrom escuro']
    },
    inverno: {
        tecidos: ['lã', 'flanela', 'veludo', 'couro'],
        cores: ['preto', 'azul escuro', 'vermelho', 'marrom', 'cinza'],
        evitar: ['cores muito claras']
    },
    'meia-estacao': {
        tecidos: ['algodão', 'jeans', 'malha leve'],
        cores: ['todas'],
        evitar: []
    },
    todas: {
        tecidos: ['todas'],
        cores: ['todas'],
        evitar: []
    }
};

// Regras de combinação por situação
const situationRules = {
    casual: {
        estilos: ['casual', 'esportivo'],
        cores: ['todas'],
        pecas: ['camiseta', 'jeans', 'tênis', 'moletom']
    },
    trabalho: {
        estilos: ['formal', 'elegante'],
        cores: ['preto', 'branco', 'azul', 'cinza'],
        pecas: ['camisa social', 'calça social', 'sapato social', 'blazer']
    },
    esporte: {
        estilos: ['esportivo'],
        cores: ['todas'],
        pecas: ['camiseta', 'shorts', 'legging', 'tênis esportivo']
    },
    festa: {
        estilos: ['elegante', 'formal'],
        cores: ['preto', 'vermelho', 'azul', 'roxo', 'rosa'],
        pecas: ['vestido', 'terno', 'camisa social', 'sapato social']
    },
    verao: {
        estilos: ['casual', 'esportivo'],
        cores: ['branco', 'azul', 'verde', 'amarelo', 'rosa', 'laranja'],
        estacao: 'verao',
        pecas: ['camiseta', 'shorts', 'regata', 'vestido leve']
    },
    inverno: {
        estilos: ['casual', 'formal', 'elegante'],
        cores: ['preto', 'azul', 'vermelho', 'marrom', 'cinza'],
        estacao: 'inverno',
        pecas: ['casaco', 'suéter', 'calça', 'bota']
    },
    chuva: {
        estilos: ['casual', 'esportivo'],
        cores: ['preto', 'azul', 'cinza'],
        estacao: 'todas',
        pecas: ['jaqueta impermeável', 'bota', 'tênis fechado']
    },
    encontro: {
        estilos: ['elegante', 'casual'],
        cores: ['preto', 'azul', 'vermelho', 'branco'],
        estacao: 'todas',
        pecas: ['camisa', 'calça', 'vestido', 'sapato']
    }
};

// Classe principal do algoritmo de combinação
class OutfitGenerator {
    constructor(wardrobe) {
        this.wardrobe = wardrobe;
        this.combinations = [];
    }
    
    // Gerar combinações aleatórias
    generateRandomCombinations(count = 5) {
        this.combinations = [];
        
        // Verificar se há itens suficientes
        if (!this.hasEnoughItems()) {
            console.warn('Não há itens suficientes no guarda-roupa para gerar combinações.');
            return this.combinations;
        }
        
        // Gerar combinações
        for (let i = 0; i < count; i++) {
            const combination = this.createRandomCombination();
            if (combination) {
                this.combinations.push(combination);
            }
        }
        
        return this.combinations;
    }
    
    // Verificar se há itens suficientes
    hasEnoughItems() {
        return (
            this.wardrobe.camisas.length > 0 &&
            this.wardrobe.calcas.length > 0 &&
            this.wardrobe.sapatos.length > 0
        );
    }
    
    // Criar uma combinação aleatória
    createRandomCombination() {
        // Selecionar itens aleatórios
        const camisa = this.getRandomItem('camisas');
        const calca = this.getRandomItem('calcas');
        const sapato = this.getRandomItem('sapatos');
        
        // Verificar compatibilidade
        if (!this.areItemsCompatible(camisa, calca) || !this.areItemsCompatible(calca, sapato)) {
            // Se não for compatível, tentar novamente (até 3 tentativas)
            for (let i = 0; i < 3; i++) {
                const newCamisa = this.getRandomItem('camisas');
                const newCalca = this.getRandomItem('calcas');
                const newSapato = this.getRandomItem('sapatos');
                
                if (this.areItemsCompatible(newCamisa, newCalca) && this.areItemsCompatible(newCalca, newSapato)) {
                    // Adicionar acessório se disponível
                    const acessorio = this.wardrobe.acessorios.length > 0 ? 
                        this.getRandomCompatibleAccessory(newCamisa, newCalca) : null;
                    
                    return {
                        id: `combination-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                        items: acessorio ? [newCamisa, newCalca, newSapato, acessorio] : [newCamisa, newCalca, newSapato],
                        score: this.calculateCombinationScore(newCamisa, newCalca, newSapato, acessorio),
                        createdAt: new Date().toISOString()
                    };
                }
            }
            
            // Se após 3 tentativas não encontrar combinação compatível, retornar null
            return null;
        }
        
        // Adicionar acessório se disponível
        const acessorio = this.wardrobe.acessorios.length > 0 ? 
            this.getRandomCompatibleAccessory(camisa, calca) : null;
        
        return {
            id: `combination-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            items: acessorio ? [camisa, calca, sapato, acessorio] : [camisa, calca, sapato],
            score: this.calculateCombinationScore(camisa, calca, sapato, acessorio),
            createdAt: new Date().toISOString()
        };
    }
    
    // Obter um item aleatório de uma categoria
    getRandomItem(category) {
        const items = this.wardrobe[category];
        return items[Math.floor(Math.random() * items.length)];
    }
    
    // Verificar se dois itens são compatíveis
    areItemsCompatible(item1, item2) {
        // Verificar compatibilidade de cores
        const colorCompatible = this.areColorsCompatible(item1.color, item2.color);
        
        // Verificar compatibilidade de estilos
        const styleCompatible = this.areStylesCompatible(item1.style, item2.style);
        
        // Verificar compatibilidade de estações
        const seasonCompatible = this.areSeasonsCompatible(item1.season, item2.season);
        
        return colorCompatible && styleCompatible && seasonCompatible;
    }
    
    // Verificar se duas cores são compatíveis
    areColorsCompatible(color1, color2) {
        // Se alguma cor não estiver definida nas regras, considerar compatível
        if (!colorRules[color1] || !colorRules[color2]) {
            return true;
        }
        
        // Verificar se as cores combinam entre si
        return colorRules[color1].combinaCom.includes(color2) || colorRules[color2].combinaCom.includes(color1);
    }
    
    // Verificar se dois estilos são compatíveis
    areStylesCompatible(style1, style2) {
        // Se algum estilo não estiver definido nas regras, considerar compatível
        if (!styleRules[style1] || !styleRules[style2]) {
            return true;
        }
        
        // Verificar se os estilos combinam entre si
        return styleRules[style1].combinaCom.includes(style2) || styleRules[style2].combinaCom.includes(style1);
    }
    
    // Verificar se duas estações são compatíveis
    areSeasonsCompatible(season1, season2) {
        // Se alguma estação for "todas", é compatível com qualquer outra
        if (season1 === 'todas' || season2 === 'todas') {
            return true;
        }
        
        // Estações iguais são compatíveis
        if (season1 === season2) {
            return true;
        }
        
        // Meia-estação é compatível com verão e inverno
        if (season1 === 'meia-estacao' || season2 === 'meia-estacao') {
            return true;
        }
        
        // Verão e inverno não são compatíveis entre si
        return !(
            (season1 === 'verao' && season2 === 'inverno') ||
            (season1 === 'inverno' && season2 === 'verao')
        );
    }
    
    // Obter um acessório compatível
    getRandomCompatibleAccessory(camisa, calca) {
        // Filtrar acessórios compatíveis
        const compatibleAccessories = this.wardrobe.acessorios.filter(acessorio => {
            return this.areItemsCompatible(camisa, acessorio) && this.areItemsCompatible(calca, acessorio);
        });
        
        // Se não houver acessórios compatíveis, retornar null
        if (compatibleAccessories.length === 0) {
            return null;
        }
        
        // Retornar um acessório aleatório
        return compatibleAccessories[Math.floor(Math.random() * compatibleAccessories.length)];
    }
    
    // Calcular pontuação da combinação
    calculateCombinationScore(camisa, calca, sapato, acessorio = null) {
        let score = 0;
        
        // Pontuação por compatibilidade de cores
        score += this.getColorCompatibilityScore(camisa, calca);
        score += this.getColorCompatibilityScore(calca, sapato);
        if (acessorio) {
            score += this.getColorCompatibilityScore(camisa, acessorio);
            score += this.getColorCompatibilityScore(calca, acessorio);
        }
        
        // Pontuação por compatibilidade de estilos
        score += this.getStyleCompatibilityScore(camisa, calca);
        score += this.getStyleCompatibilityScore(calca, sapato);
        if (acessorio) {
            score += this.getStyleCompatibilityScore(camisa, acessorio);
            score += this.getStyleCompatibilityScore(calca, acessorio);
        }
        
        // Pontuação por compatibilidade de estações
        score += this.getSeasonCompatibilityScore(camisa, calca);
        score += this.getSeasonCompatibilityScore(calca, sapato);
        if (acessorio) {
            score += this.getSeasonCompatibilityScore(camisa, acessorio);
            score += this.getSeasonCompatibilityScore(calca, acessorio);
        }
        
        return score;
    }
    
    // Pontuação por compatibilidade de cores
    getColorCompatibilityScore(item1, item2) {
        const color1 = item1.color;
        const color2 = item2.color;
        
        // Se alguma cor não estiver definida nas regras, pontuação neutra
        if (!colorRules[color1] || !colorRules[color2]) {
            return 5;
        }
        
        // Cores iguais
        if (color1 === color2) {
            return 7;
        }
        
        // Cores complementares
        if (
            (colorRules[color1].complementar === color2) ||
            (colorRules[color2].complementar === color1)
        ) {
            return 10;
        }
        
        // Cores que combinam
        if (colorRules[color1].combinaCom.includes(color2)) {
            return 8;
        }
        
        // Cores que não combinam
        return 2;
    }
    
    // Pontuação por compatibilidade de estilos
    getStyleCompatibilityScore(item1, item2) {
        const style1 = item1.style;
        const style2 = item2.style;
        
        // Se algum estilo não estiver definido nas regras, pontuação neutra
        if (!styleRules[style1] || !styleRules[style2]) {
            return 5;
        }
        
        // Estilos iguais
        if (style1 === style2) {
            return 10;
        }
        
        // Estilos que combinam
        if (styleRules[style1].combinaCom.includes(style2)) {
            return 8;
        }
        
        // Estilos que não combinam
        return 2;
    }
    
    // Pontuação por compatibilidade de estações
    getSeasonCompatibilityScore(item1, item2) {
        const season1 = item1.season;
        const season2 = item2.season;
        
        // Se alguma estação for "todas", pontuação alta
        if (season1 === 'todas' || season2 === 'todas') {
            return 10;
        }
        
        // Estações iguais
        if (season1 === season2) {
            return 10;
        }
        
        // Meia-estação com verão ou inverno
        if (
            (season1 === 'meia-estacao' && (season2 === 'verao' || season2 === 'inverno')) ||
            (season2 === 'meia-estacao' && (season1 === 'verao' || season1 === 'inverno'))
        ) {
            return 7;
        }
        
        // Verão e inverno
        if (
            (season1 === 'verao' && season2 === 'inverno') ||
            (season1 === 'inverno' && season2 === 'verao')
        ) {
            return 2;
        }
        
        return 5;
    }
    
    // Gerar combinações para uma situação específica
    generateSituationCombinations(situationType, count = 3) {
        this.combinations = [];
        
        // Verificar se a situação existe
        if (!situationRules[situationType]) {
            console.warn(`Situação "${situationType}" não encontrada nas regras.`);
            return this.combinations;
        }
        
        // Obter regras da situação
        const situation = situationRules[situationType];
        
        // Filtrar itens adequados para a situação
        const filteredCamisas = this.filterItemsForSituation(this.wardrobe.camisas, situation);
        const filteredCalcas = this.filterItemsForSituation(this.wardrobe.calcas, situation);
        const filteredSapatos = this.filterItemsForSituation(this.wardrobe.sapatos, situation);
        const filteredAcessorios = this.wardrobe.acessorios.length > 0 ? 
            this.filterItemsForSituation(this.wardrobe.acessorios, situation) : [];
        
        // Verificar se há itens suficientes
        if (filteredCamisas.length === 0 || filteredCalcas.length === 0 || filteredSapatos.length === 0) {
            console.warn(`Não há itens suficientes para a situação "${situationType}".`);
            return this.combinations;
        }
        
        // Gerar combinações
        for (let i = 0; i < count; i++) {
            // Selecionar itens aleatórios
            const camisa = filteredCamisas[Math.floor(Math.random() * filteredCamisas.length)];
            const calca = filteredCalcas[Math.floor(Math.random() * filteredCalcas.length)];
            const sapato = filteredSapatos[Math.floor(Math.random() * filteredSapatos.length)];
            
            // Verificar compatibilidade
            if (!this.areItemsCompatible(camisa, calca) || !this.areItemsCompatible(calca, sapato)) {
                // Se não for compatível, tentar novamente (até 3 tentativas)
                let compatible = false;
                
                for (let j = 0; j < 3; j++) {
                    const newCamisa = filteredCamisas[Math.floor(Math.random() * filteredCamisas.length)];
                    const newCalca = filteredCalcas[Math.floor(Math.random() * filteredCalcas.length)];
                    const newSapato = filteredSapatos[Math.floor(Math.random() * filteredSapatos.length)];
                    
                    if (this.areItemsCompatible(newCamisa, newCalca) && this.areItemsCompatible(newCalca, newSapato)) {
                        // Adicionar acessório se disponível
                        const acessorio = filteredAcessorios.length > 0 ? 
                            this.getRandomCompatibleAccessoryFromList(newCamisa, newCalca, filteredAcessorios) : null;
                        
                        this.combinations.push({
                            id: `${situationType}-${Date.now()}-${i}`,
                            items: acessorio ? [newCamisa, newCalca, newSapato, acessorio] : [newCamisa, newCalca, newSapato],
                            situation: situationType,
                            score: this.calculateCombinationScore(newCamisa, newCalca, newSapato, acessorio),
                            createdAt: new Date().toISOString()
                        });
                        
                        compatible = true;
                        break;
                    }
                }
                
                // Se após 3 tentativas não encontrar combinação compatível, pular esta iteração
                if (!compatible) {
                    continue;
                }
            } else {
                // Adicionar acessório se disponível
                const acessorio = filteredAcessorios.length > 0 ? 
                    this.getRandomCompatibleAccessoryFromList(camisa, calca, filteredAcessorios) : null;
                
                this.combinations.push({
                    id: `${situationType}-${Date.now()}-${i}`,
                    items: acessorio ? [camisa, calca, sapato, acessorio] : [camisa, calca, sapato],
                    situation: situationType,
                    score: this.calculateCombinationScore(camisa, calca, sapato, acessorio),
                    createdAt: new Date().toISOString()
                });
            }
        }
        
        // Ordenar por pontuação
        this.combinations.sort((a, b) => b.score - a.score);
        
        return this.combinations;
    }
    
    // Filtrar itens para uma situação
    filterItemsForSituation(items, situation) {
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
    
    // Obter um acessório compatível de uma lista
    getRandomCompatibleAccessoryFromList(camisa, calca, acessorios) {
        // Filtrar acessórios compatíveis
        const compatibleAccessories = acessorios.filter(acessorio => {
            return this.areItemsCompatible(camisa, acessorio) && this.areItemsCompatible(calca, acessorio);
        });
        
        // Se não houver acessórios compatíveis, retornar null
        if (compatibleAccessories.length === 0) {
            return null;
        }
        
        // Retornar um acessório aleatório
        return compatibleAccessories[Math.floor(Math.random() * compatibleAccessories.length)];
    }
    
    // Gerar combinações baseadas em um item específico
    generateCombinationsFromItem(item, category, count = 3) {
        this.combinations = [];
        
        // Verificar se a categoria existe
        if (!this.wardrobe[category]) {
            console.warn(`Categoria "${category}" não encontrada no guarda-roupa.`);
            return this.combinations;
        }
        
        // Verificar se o item existe na categoria
        const itemExists = this.wardrobe[category].some(i => i.id === item.id);
        if (!itemExists) {
            console.warn(`Item não encontrado na categoria "${category}".`);
            return this.combinations;
        }
        
        // Gerar combinações baseadas no item
        switch (category) {
            case 'camisas':
                this.generateCombinationsFromShirt(item, count);
                break;
            case 'calcas':
                this.generateCombinationsFromPants(item, count);
                break;
            case 'sapatos':
                this.generateCombinationsFromShoes(item, count);
                break;
            case 'acessorios':
                this.generateCombinationsFromAccessory(item, count);
                break;
            default:
                console.warn(`Categoria "${category}" não suportada para geração de combinações.`);
        }
        
        return this.combinations;
    }
    
    // Gerar combinações a partir de uma camisa
    generateCombinationsFromShirt(shirt, count = 3) {
        // Filtrar calças compatíveis
        const compatiblePants = this.wardrobe.calcas.filter(calca => {
            return this.areItemsCompatible(shirt, calca);
        });
        
        // Verificar se há calças compatíveis
        if (compatiblePants.length === 0) {
            console.warn('Não há calças compatíveis com esta camisa.');
            return this.combinations;
        }
        
        // Gerar combinações
        for (let i = 0; i < Math.min(count, compatiblePants.length); i++) {
            const calca = compatiblePants[Math.floor(Math.random() * compatiblePants.length)];
            
            // Filtrar sapatos compatíveis
            const compatibleShoes = this.wardrobe.sapatos.filter(sapato => {
                return this.areItemsCompatible(calca, sapato);
            });
            
            // Verificar se há sapatos compatíveis
            if (compatibleShoes.length === 0) {
                continue;
            }
            
            const sapato = compatibleShoes[Math.floor(Math.random() * compatibleShoes.length)];
            
            // Adicionar acessório se disponível
            const acessorio = this.wardrobe.acessorios.length > 0 ? 
                this.getRandomCompatibleAccessory(shirt, calca) : null;
            
            this.combinations.push({
                id: `shirt-${Date.now()}-${i}`,
                items: acessorio ? [shirt, calca, sapato, acessorio] : [shirt, calca, sapato],
                baseItem: {
                    item: shirt,
                    category: 'camisas'
                },
                score: this.calculateCombinationScore(shirt, calca, sapato, acessorio),
                createdAt: new Date().toISOString()
            });
            
            // Remover a calça usada para evitar repetições
            compatiblePants.splice(compatiblePants.indexOf(calca), 1);
        }
        
        return this.combinations;
    }
    
    // Gerar combinações a partir de uma calça
    generateCombinationsFromPants(pants, count = 3) {
        // Filtrar camisas compatíveis
        const compatibleShirts = this.wardrobe.camisas.filter(camisa => {
            return this.areItemsCompatible(pants, camisa);
        });
        
        // Verificar se há camisas compatíveis
        if (compatibleShirts.length === 0) {
            console.warn('Não há camisas compatíveis com esta calça.');
            return this.combinations;
        }
        
        // Gerar combinações
        for (let i = 0; i < Math.min(count, compatibleShirts.length); i++) {
            const camisa = compatibleShirts[Math.floor(Math.random() * compatibleShirts.length)];
            
            // Filtrar sapatos compatíveis
            const compatibleShoes = this.wardrobe.sapatos.filter(sapato => {
                return this.areItemsCompatible(pants, sapato);
            });
            
            // Verificar se há sapatos compatíveis
            if (compatibleShoes.length === 0) {
                continue;
            }
            
            const sapato = compatibleShoes[Math.floor(Math.random() * compatibleShoes.length)];
            
            // Adicionar acessório se disponível
            const acessorio = this.wardrobe.acessorios.length > 0 ? 
                this.getRandomCompatibleAccessory(camisa, pants) : null;
            
            this.combinations.push({
                id: `pants-${Date.now()}-${i}`,
                items: acessorio ? [camisa, pants, sapato, acessorio] : [camisa, pants, sapato],
                baseItem: {
                    item: pants,
                    category: 'calcas'
                },
                score: this.calculateCombinationScore(camisa, pants, sapato, acessorio),
                createdAt: new Date().toISOString()
            });
            
            // Remover a camisa usada para evitar repetições
            compatibleShirts.splice(compatibleShirts.indexOf(camisa), 1);
        }
        
        return this.combinations;
    }
    
    // Gerar combinações a partir de um sapato
    generateCombinationsFromShoes(shoes, count = 3) {
        // Filtrar calças compatíveis
        const compatiblePants = this.wardrobe.calcas.filter(calca => {
            return this.areItemsCompatible(shoes, calca);
        });
        
        // Verificar se há calças compatíveis
        if (compatiblePants.length === 0) {
            console.warn('Não há calças compatíveis com este sapato.');
            return this.combinations;
        }
        
        // Gerar combinações
        for (let i = 0; i < Math.min(count, compatiblePants.length); i++) {
            const calca = compatiblePants[Math.floor(Math.random() * compatiblePants.length)];
            
            // Filtrar camisas compatíveis
            const compatibleShirts = this.wardrobe.camisas.filter(camisa => {
                return this.areItemsCompatible(calca, camisa);
            });
            
            // Verificar se há camisas compatíveis
            if (compatibleShirts.length === 0) {
                continue;
            }
            
            const camisa = compatibleShirts[Math.floor(Math.random() * compatibleShirts.length)];
            
            // Adicionar acessório se disponível
            const acessorio = this.wardrobe.acessorios.length > 0 ? 
                this.getRandomCompatibleAccessory(camisa, calca) : null;
            
            this.combinations.push({
                id: `shoes-${Date.now()}-${i}`,
                items: acessorio ? [camisa, calca, shoes, acessorio] : [camisa, calca, shoes],
                baseItem: {
                    item: shoes,
                    category: 'sapatos'
                },
                score: this.calculateCombinationScore(camisa, calca, shoes, acessorio),
                createdAt: new Date().toISOString()
            });
            
            // Remover a calça usada para evitar repetições
            compatiblePants.splice(compatiblePants.indexOf(calca), 1);
        }
        
        return this.combinations;
    }
    
    // Gerar combinações a partir de um acessório
    generateCombinationsFromAccessory(accessory, count = 3) {
        // Filtrar camisas compatíveis
        const compatibleShirts = this.wardrobe.camisas.filter(camisa => {
            return this.areItemsCompatible(accessory, camisa);
        });
        
        // Verificar se há camisas compatíveis
        if (compatibleShirts.length === 0) {
            console.warn('Não há camisas compatíveis com este acessório.');
            return this.combinations;
        }
        
        // Gerar combinações
        for (let i = 0; i < Math.min(count, compatibleShirts.length); i++) {
            const camisa = compatibleShirts[Math.floor(Math.random() * compatibleShirts.length)];
            
            // Filtrar calças compatíveis
            const compatiblePants = this.wardrobe.calcas.filter(calca => {
                return this.areItemsCompatible(camisa, calca) && this.areItemsCompatible(accessory, calca);
            });
            
            // Verificar se há calças compatíveis
            if (compatiblePants.length === 0) {
                continue;
            }
            
            const calca = compatiblePants[Math.floor(Math.random() * compatiblePants.length)];
            
            // Filtrar sapatos compatíveis
            const compatibleShoes = this.wardrobe.sapatos.filter(sapato => {
                return this.areItemsCompatible(calca, sapato);
            });
            
            // Verificar se há sapatos compatíveis
            if (compatibleShoes.length === 0) {
                continue;
            }
            
            const sapato = compatibleShoes[Math.floor(Math.random() * compatibleShoes.length)];
            
            this.combinations.push({
                id: `accessory-${Date.now()}-${i}`,
                items: [camisa, calca, sapato, accessory],
                baseItem: {
                    item: accessory,
                    category: 'acessorios'
                },
                score: this.calculateCombinationScore(camisa, calca, sapato, accessory),
                createdAt: new Date().toISOString()
            });
            
            // Remover a camisa usada para evitar repetições
            compatibleShirts.splice(compatibleShirts.indexOf(camisa), 1);
        }
        
        return this.combinations;
    }
}

// Exportar a classe para uso no aplicativo
window.OutfitGenerator = OutfitGenerator;
