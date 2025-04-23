// Função para manipular o upload de imagens
function handleImageUpload() {
    // Referências aos elementos do DOM
    const uploadArea = document.getElementById('upload-area');
    const photoUpload = document.getElementById('photo-upload');
    const previewImage = document.getElementById('preview-image');
    const itemDetails = document.getElementById('item-details');
    
    // Configurar o evento de clique na área de upload
    uploadArea.addEventListener('click', function() {
        photoUpload.click();
    });
    
    // Configurar o evento de arrastar e soltar (drag and drop)
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    // Configurar o evento de mudança no input de arquivo
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    });
    
    // Função para processar o arquivo
    function handleFile(file) {
        // Verificar se é uma imagem
        if (!file.type.match('image.*')) {
            alert('Por favor, selecione uma imagem.');
            return;
        }
        
        // Limitar o tamanho do arquivo (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem é muito grande. Por favor, selecione uma imagem menor que 5MB.');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Exibir a imagem na pré-visualização
            previewImage.src = e.target.result;
            
            // Esconder a área de upload e mostrar os detalhes do item
            uploadArea.classList.add('hidden');
            itemDetails.classList.remove('hidden');
            
            // Armazenar a imagem temporariamente
            sessionStorage.setItem('tempImage', e.target.result);
        };
        
        reader.readAsDataURL(file);
    }
}

// Função para salvar o item no guarda-roupa
function saveItemToWardrobe() {
    // Obter os valores do formulário
    const category = document.getElementById('item-category').value;
    const color = document.getElementById('item-color').value;
    const style = document.getElementById('item-style').value;
    const season = document.getElementById('item-season').value;
    const image = sessionStorage.getItem('tempImage');
    
    if (!image) {
        alert('Erro ao salvar a imagem. Por favor, tente novamente.');
        return;
    }
    
    // Criar um novo item
    const newItem = {
        id: `${category}-${Date.now()}`, // ID único baseado na categoria e timestamp
        image: image,
        color: color,
        style: style,
        season: season,
        dateAdded: new Date().toISOString()
    };
    
    // Adicionar o item ao guarda-roupa
    wardrobe[category].push(newItem);
    
    // Salvar o guarda-roupa no localStorage
    saveWardrobeToStorage();
    
    // Limpar a imagem temporária
    sessionStorage.removeItem('tempImage');
    
    // Resetar o formulário
    document.getElementById('upload-area').classList.remove('hidden');
    document.getElementById('item-details').classList.add('hidden');
    document.getElementById('photo-upload').value = '';
    
    // Mostrar mensagem de sucesso
    showNotification('Item adicionado com sucesso!');
    
    // Voltar para o guarda-roupa
    navigateTo('wardrobe-screen');
    
    // Atualizar a tab ativa para a categoria do item adicionado
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.dataset.category === category) {
            tab.click();
        }
    });
}

// Função para salvar o guarda-roupa no localStorage
function saveWardrobeToStorage() {
    try {
        localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
    } catch (e) {
        // Se o localStorage estiver cheio, limpar alguns itens antigos
        if (e.name === 'QuotaExceededError') {
            cleanupStorage();
            try {
                localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
            } catch (e) {
                console.error('Erro ao salvar no localStorage:', e);
            }
        } else {
            console.error('Erro ao salvar no localStorage:', e);
        }
    }
}

// Função para carregar o guarda-roupa do localStorage
function loadWardrobeFromStorage() {
    const savedWardrobe = localStorage.getItem('wardrobe');
    if (savedWardrobe) {
        try {
            wardrobe = JSON.parse(savedWardrobe);
        } catch (e) {
            console.error('Erro ao carregar do localStorage:', e);
        }
    }
}

// Função para limpar o armazenamento quando estiver cheio
function cleanupStorage() {
    // Remover os itens mais antigos de cada categoria
    for (let category in wardrobe) {
        if (wardrobe[category].length > 10) {
            // Ordenar por data de adição (mais antigos primeiro)
            wardrobe[category].sort((a, b) => {
                return new Date(a.dateAdded) - new Date(b.dateAdded);
            });
            
            // Remover os 5 mais antigos
            wardrobe[category] = wardrobe[category].slice(5);
        }
    }
}

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar a notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Esconder e remover a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para capturar foto usando a câmera (se disponível)
function capturePhoto() {
    // Verificar se o navegador suporta a API de mídia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Seu navegador não suporta acesso à câmera.');
        return;
    }
    
    // Criar elementos para a câmera
    const cameraContainer = document.createElement('div');
    cameraContainer.className = 'camera-container';
    
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.playsinline = true;
    
    const captureButton = document.createElement('button');
    captureButton.className = 'capture-button';
    captureButton.innerHTML = '<i class="fas fa-camera"></i>';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    
    cameraContainer.appendChild(videoElement);
    cameraContainer.appendChild(captureButton);
    cameraContainer.appendChild(closeButton);
    
    document.body.appendChild(cameraContainer);
    
    // Acessar a câmera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(stream) {
            videoElement.srcObject = stream;
            
            // Configurar o botão de captura
            captureButton.addEventListener('click', function() {
                // Criar um canvas para capturar o frame do vídeo
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                
                const context = canvas.getContext('2d');
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                
                // Converter para base64
                const imageData = canvas.toDataURL('image/jpeg');
                
                // Parar a câmera
                stream.getTracks().forEach(track => track.stop());
                
                // Remover o container da câmera
                document.body.removeChild(cameraContainer);
                
                // Exibir a imagem capturada
                document.getElementById('preview-image').src = imageData;
                document.getElementById('upload-area').classList.add('hidden');
                document.getElementById('item-details').classList.remove('hidden');
                
                // Armazenar a imagem temporariamente
                sessionStorage.setItem('tempImage', imageData);
            });
            
            // Configurar o botão de fechar
            closeButton.addEventListener('click', function() {
                // Parar a câmera
                stream.getTracks().forEach(track => track.stop());
                
                // Remover o container da câmera
                document.body.removeChild(cameraContainer);
            });
        })
        .catch(function(error) {
            console.error('Erro ao acessar a câmera:', error);
            alert('Não foi possível acessar a câmera. Verifique as permissões.');
            document.body.removeChild(cameraContainer);
        });
}

// Função para comprimir a imagem antes de salvar
function compressImage(imageDataUrl, maxWidth, quality) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            // Calcular as novas dimensões
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            // Criar canvas para redimensionar
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            
            // Desenhar a imagem redimensionada
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // Converter para base64 com compressão
            const compressedImage = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedImage);
        };
        
        img.onerror = function() {
            reject(new Error('Erro ao carregar a imagem para compressão'));
        };
        
        img.src = imageDataUrl;
    });
}

// Atualizar a função saveItem para usar a nova função de salvar no guarda-roupa
function saveItem() {
    const image = sessionStorage.getItem('tempImage');
    
    if (image) {
        // Comprimir a imagem antes de salvar
        compressImage(image, 800, 0.7)
            .then(compressedImage => {
                // Atualizar a imagem temporária com a versão comprimida
                sessionStorage.setItem('tempImage', compressedImage);
                
                // Salvar o item
                saveItemToWardrobe();
            })
            .catch(error => {
                console.error('Erro ao comprimir a imagem:', error);
                // Tentar salvar mesmo sem compressão
                saveItemToWardrobe();
            });
    } else {
        alert('Por favor, selecione uma imagem primeiro.');
    }
}

// Inicialização do aplicativo (atualizada)
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados do localStorage
    loadWardrobeFromStorage();
    
    // Se o guarda-roupa estiver vazio, carregar dados de exemplo
    if (Object.values(wardrobe).every(category => category.length === 0)) {
        loadSampleData();
    }
    
    // Configurar eventos
    setupEventListeners();
    
    // Configurar o upload de imagens
    handleImageUpload();
    
    // Adicionar botão de câmera
    const uploadArea = document.getElementById('upload-area');
    const cameraButton = document.createElement('button');
    cameraButton.className = 'camera-button';
    cameraButton.innerHTML = '<i class="fas fa-camera"></i> Usar Câmera';
    cameraButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que o clique propague para o uploadArea
        capturePhoto();
    });
    uploadArea.appendChild(cameraButton);
    
    // Mostrar tela inicial
    navigateTo('home-screen');
});
