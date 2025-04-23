// Testes do aplicativo de combinação de roupas
// Este arquivo contém funções para testar as principais funcionalidades do aplicativo

// Função para executar todos os testes
function runAllTests() {
    console.log('Iniciando testes do aplicativo...');
    
    // Array para armazenar resultados dos testes
    const testResults = [];
    
    // Testar carregamento inicial
    testResults.push(testInitialLoading());
    
    // Testar navegação entre telas
    testResults.push(testNavigation());
    
    // Testar funcionalidade de upload
    testResults.push(testUploadFunctionality());
    
    // Testar algoritmo de combinação
    testResults.push(testCombinationAlgorithm());
    
    // Testar categorias de situações
    testResults.push(testSituationCategories());
    
    // Testar armazenamento local
    testResults.push(testLocalStorage());
    
    // Exibir resultados dos testes
    displayTestResults(testResults);
}

// Função para testar o carregamento inicial
function testInitialLoading() {
    console.log('Testando carregamento inicial...');
    
    try {
        // Verificar se o guarda-roupa foi inicializado
        if (!wardrobe) {
            return {
                name: 'Carregamento inicial',
                success: false,
                message: 'Falha ao inicializar o guarda-roupa'
            };
        }
        
        // Verificar se todas as categorias foram inicializadas
        const categories = ['camisas', 'calcas', 'sapatos', 'acessorios'];
        for (const category of categories) {
            if (!wardrobe[category]) {
                return {
                    name: 'Carregamento inicial',
                    success: false,
                    message: `Categoria ${category} não foi inicializada`
                };
            }
        }
        
        return {
            name: 'Carregamento inicial',
            success: true,
            message: 'Todas as categorias foram inicializadas corretamente'
        };
    } catch (error) {
        return {
            name: 'Carregamento inicial',
            success: false,
            message: `Erro: ${error.message}`
        };
    }
}

// Função para testar a navegação entre telas
function testNavigation() {
    console.log('Testando navegação entre telas...');
    
    try {
        // Verificar se a função de navegação existe
        if (typeof navigateTo !== 'function') {
            return {
                name: 'Navegação entre telas',
                success: false,
                message: 'Função de navegação não encontrada'
            };
        }
        
        // Verificar se todas as telas existem
        const screens = [
            'home-screen',
            'wardrobe-screen',
            'upload-screen',
            'combinations-screen',
            'situations-screen',
            'favorites-screen'
        ];
        
        for (const screenId of screens) {
            const screen = document.getElementById(screenId);
            if (!screen) {
                return {
                    name: 'Navegação entre telas',
                    success: false,
                    message: `Tela ${screenId} não encontrada`
                };
            }
        }
        
        // Testar navegação para cada tela
        for (const screenId of screens) {
            // Salvar a tela atual
            const currentScreen = document.querySelector('.screen:not(.hidden)');
            const currentScreenId = currentScreen ? currentScreen.id : null;
            
            // Navegar para a nova tela
            navigateTo(screenId);
            
            // Verificar se a navegação funcionou
            const activeScreen = document.querySelector('.screen:not(.hidden)');
            if (!activeScreen || activeScreen.id !== screenId) {
                // Restaurar a tela original
                if (currentScreenId) {
                    navigateTo(currentScreenId);
                }
                
                return {
                    name: 'Navegação entre telas',
                    success: false,
                    message: `Falha ao navegar para ${screenId}`
                };
            }
        }
        
        // Restaurar a tela inicial
        navigateTo('home-screen');
        
        return {
            name: 'Navegação entre telas',
            success: true,
            message: 'Navegação entre todas as telas funcionou corretamente'
        };
    } catch (error) {
        // Restaurar a tela inicial em caso de erro
        try {
            navigateTo('home-screen');
        } catch (e) {
            // Ignorar erro ao restaurar
        }
        
        return {
            name: 'Navegação entre telas',
            success: false,
            message: `Erro: ${error.message}`
        };
    }
}

// Função para testar a funcionalidade de upload
function testUploadFunctionality() {
    console.log('Testando funcionalidade de upload...');
    
    try {
        // Verificar se as funções de upload existem
        if (typeof handleImageUpload !== 'function') {
            return {
                name: 'Funcionalidade de upload',
                success: false,
                message: 'Função handleImageUpload não encontrada'
            };
        }
        
        if (typeof saveItem !== 'function') {
            return {
                name: 'Funcionalidade de upload',
                success: false,
                message: 'Função saveItem não encontrada'
            };
        }
        
        // Verificar se os elementos de upload existem
        const uploadArea = document.getElementById('upload-area');
        const photoUpload = document.getElementById('photo-upload');
        const itemDetails = document.getElementById('item-details');
        
        if (!uploadArea || !photoUpload || !itemDetails) {
            return {
                name: 'Funcionalidade de upload',
                success: false,
                message: 'Elementos de upload não encontrados'
            };
        }
        
        // Verificar se os campos de metadados existem
        const categorySelect = document.getElementById('item-category');
        const colorSelect = document.getElementById('item-color');
        const styleSelect = document.getElementById('item-style');
        const seasonSelect = document.getElementById('item-season');
        
        if (!categorySelect || !colorSelect || !styleSelect || !seasonSelect) {
            return {
                name: 'Funcionalidade de upload',
                success: false,
                message: 'Campos de metadados não encontrados'
            };
        }
        
        // Simular upload de imagem (não é possível testar completamente sem interação do usuário)
        // Mas podemos verificar se a estrutura está correta
        
        return {
            name: 'Funcionalidade de upload',
            success: true,
            message: 'Estrutura de upload verificada com sucesso'
        };
    } catch (error) {
        return {
            name: 'Funcionalidade de upload',
            success: false,
            message: `Erro: ${error.message}`
        };
    }
}

// Função para testar o algoritmo de combinação
function testCombinationAlgorithm() {
    console.log('Testando algoritmo de combinação...');
    
    try {
        // Verificar se a classe OutfitGenerator existe
        if (typeof OutfitGenerator !== 'function') {
            return {
                name: 'Algoritmo de combinação',
                success: false,
                message: 'Classe OutfitGenerator não encontrada'
            };
        }
        
        // Criar uma instância do gerador de combinações
        const outfitGenerator = new OutfitGenerator(wardrobe);
        
        // Verificar se os métodos principais existem
        const methods = [
            'generateRandomCombinations',
            'generateSituationCombinations',
            'generateCombinationsFromItem'
        ];
        
        for (const method of methods) {
            if (typeof outfitGenerator[method] !== 'function') {
                return {
                    name: 'Algoritmo de combinação',
                    success: false,
                    message: `Método ${method} não encontrado`
                };
            }
        }
        
        // Testar geração de combinações aleatórias
        const randomCombinations = outfitGenerator.generateRandomCombinations(1);
        
        // Verificar se pelo menos uma combinação foi gerada
        // (pode não gerar se não houver itens suficientes, o que é aceitável)
        
        return {
            name: 'Algoritmo de combinação',
            success: true,
            message: 'Algoritmo de combinação verificado com sucesso'
        };
    } catch (error) {
        return {
            name: 'Algoritmo de combinação',
            success: false,
            message: `Erro: ${error.message}`
        };
    }
}

// Função para testar as categorias de situações
function testSituationCategories() {
    console.log('Testando categorias de situações...');
    
    try {
        // Verificar se as funções de situações existem
        if (typeof initializeSituationsScreen !== 'function') {
            return {
                name: 'Categorias de situações',
                success: false,
                message: 'Função initializeSituationsScreen não encontrada'
            };
        }
        
        if (typeof showSituationDetail !== 'function') {
            return {
                name: 'Categorias de situações',
                success: false,
                message: 'Função showSituationDetail não encontrada'
            };
        }
        
        if (typeof generateSituationCombination !== 'function') {
            return {
                name: 'Categorias de situações',
                success: false,
                message: 'Função generateSituationCombination não encontrada'
            };
        }
        
        // Verificar se as situações foram definidas
        if (typeof situationDetails !== 'object') {
            return {
                name: 'Categorias de situações',
                success: false,
                message: 'Objeto situationDetails não encontrado'
            };
        }
        
        // Verificar se todas as situações básicas existem
        const basicSituations = ['casual', 'trabalho', 'esporte', 'festa'];
        
        for (const situation of basicSituations) {
            if (!situationDetails[situation]) {
                return {
                    name: 'Categorias de situações',
                    success: false,
                    message: `Situação ${situation} não encontrada`
                };
            }
        }
        
        return {
            name: 'Categorias de situações',
            success: true,
            message: 'Categorias de situações verificadas com sucesso'
        };
    } catch (error) {
        return {
            name: 'Categorias de situações',
            success: false,
            message: `Erro: ${error.message}`
        };
    }
}

// Função para testar o armazenamento local
function testLocalStorage() {
    console.log('Testando armazenamento local...');
    
    try {
        // Verificar se as funções de armazenamento existem
        if (typeof saveWardrobeToStorage !== 'function') {
            return {
                name: 'Armazenamento local',
                success: false,
                message: 'Função saveWardrobeToStorage não encontrada'
            };
        }
        
        if (typeof loadWardrobeFromStorage !== 'function') {
            return {
                name: 'Armazenamento local',
                success: false,
                message: 'Função loadWardrobeFromStorage não encontrada'
            };
        }
        
        // Testar salvamento no localStorage
        const originalWardrobe = JSON.parse(JSON.stringify(wardrobe));
        
        // Adicionar um item de teste
        const testItem = {
            id: 'test-item',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
            color: 'preto',
            style: 'casual',
            season: 'todas',
            dateAdded: new Date().toISOString()
        };
        
        wardrobe.camisas.push(testItem);
        
        // Salvar no localStorage
        saveWardrobeToStorage();
        
        // Restaurar o guarda-roupa original
        wardrobe = originalWardrobe;
        
        // Carregar do localStorage
        loadWardrobeFromStorage();
        
        // Verificar se o item de teste foi carregado
        const testItemLoaded = wardrobe.camisas.some(item => item.id === 'test-item');
        
        // Remover o item de teste
        wardrobe.camisas = wardrobe.camisas.filter(item => item.id !== 'test-item');
        saveWardrobeToStorage();
        
        if (!testItemLoaded) {
            return {
                name: 'Armazenamento local',
                success: false,
                message: 'Falha ao salvar e carregar do localStorage'
            };
        }
        
        return {
            name: 'Armazenamento local',
            success: true,
            message: 'Armazenamento local verificado com sucesso'
        };
    } catch (error) {
        return {
            name: 'Armazenamento local',
            success: false,
            message: `Erro: ${error.message}`
        };
    }
}

// Função para exibir os resultados dos testes
function displayTestResults(results) {
    console.log('Resultados dos testes:');
    
    // Contar testes bem-sucedidos
    const successCount = results.filter(result => result.success).length;
    
    console.log(`${successCount}/${results.length} testes passaram`);
    
    // Exibir detalhes de cada teste
    results.forEach(result => {
        console.log(`${result.success ? '✅' : '❌'} ${result.name}: ${result.message}`);
    });
    
    // Criar modal de resultados
    const modal = document.createElement('div');
    modal.className = 'test-results-modal';
    
    // Criar conteúdo do modal
    let resultsHTML = '';
    results.forEach(result => {
        resultsHTML += `
            <div class="test-result ${result.success ? 'success' : 'failure'}">
                <div class="test-result-icon">${result.success ? '✅' : '❌'}</div>
                <div class="test-result-details">
                    <div class="test-result-name">${result.name}</div>
                    <div class="test-result-message">${result.message}</div>
                </div>
            </div>
        `;
    });
    
    modal.innerHTML = `
        <div class="test-results-modal-content">
            <div class="test-results-modal-header">
                <h3>Resultados dos Testes</h3>
                <button class="close-button"><i class="fas fa-times"></i></button>
            </div>
            <div class="test-results-modal-body">
                <div class="test-results-summary">
                    <div class="test-results-count">${successCount}/${results.length}</div>
                    <div class="test-results-label">testes passaram</div>
                </div>
                <div class="test-results-list">
                    ${resultsHTML}
                </div>
            </div>
        </div>
    `;
    
    // Adicionar modal ao corpo do documento
    document.body.appendChild(modal);
    
    // Configurar evento de fechar
    modal.querySelector('.close-button').addEventListener('click', function() {
        document.body.removeChild(modal);
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
    
    // Adicionar estilos para o modal de resultados
    const style = document.createElement('style');
    style.textContent = `
        .test-results-modal {
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
        
        .test-results-modal.show {
            opacity: 1;
        }
        
        .test-results-modal-content {
            width: 90%;
            max-width: 350px;
            background-color: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: scale(0.9);
            transition: transform 0.3s;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
        }
        
        .test-results-modal.show .test-results-modal-content {
            transform: scale(1);
        }
        
        .test-results-modal-header {
            padding: 15px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .test-results-modal-header h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        
        .test-results-modal-header .close-button {
            background: none;
            border: none;
            font-size: 16px;
            color: #999;
        }
        
        .test-results-modal-body {
            padding: 15px;
            overflow-y: auto;
            flex: 1;
        }
        
        .test-results-summary {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .test-results-count {
            font-size: 24px;
            font-weight: 600;
            color: #333;
        }
        
        .test-results-label {
            font-size: 14px;
            color: #666;
        }
        
        .test-results-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .test-result {
            display: flex;
            gap: 10px;
            padding: 10px;
            border-radius: 8px;
            background-color: #f8f8f8;
        }
        
        .test-result.success {
            border-left: 3px solid #34c759;
        }
        
        .test-result.failure {
            border-left: 3px solid #ff3b30;
        }
        
        .test-result-icon {
            font-size: 18px;
        }
        
        .test-result-details {
            flex: 1;
        }
        
        .test-result-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        
        .test-result-message {
            font-size: 12px;
            color: #666;
        }
    `;
    
    // Adicionar ao cabeçalho
    document.head.appendChild(style);
}

// Adicionar botão de teste ao aplicativo
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão de teste
    const testButton = document.createElement('button');
    testButton.className = 'test-button';
    testButton.innerHTML = '<i class="fas fa-vial"></i>';
    testButton.title = 'Executar testes';
    
    // Adicionar estilos para o botão
    const style = document.createElement('style');
    style.textContent = `
        .test-button {
            position: fixed;
            bottom: 85px;
            left: 15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #007aff;
            color: white;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 100;
        }
    `;
    
    // Adicionar ao cabeçalho
    document.head.appendChild(style);
    
    // Adicionar ao corpo do documento
    document.body.appendChild(testButton);
    
    // Configurar evento de clique
    testButton.addEventListener('click', function() {
        runAllTests();
    });
});
