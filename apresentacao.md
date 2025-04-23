# Apresentação do Projeto - VesteBem

## Visão Geral

**VesteBem** é um aplicativo móvel inovador que permite aos utilizadores organizar o seu guarda-roupa digital e gerar combinações de roupas para várias situações. Desenvolvido para iPhone, o aplicativo utiliza tecnologias modernas para oferecer uma experiência intuitiva e útil.

## Problema Resolvido

Muitas pessoas enfrentam diariamente o desafio de escolher o que vestir, seja por:
- Falta de tempo para experimentar diferentes combinações
- Dificuldade em visualizar como as peças ficariam juntas
- Incerteza sobre quais roupas são adequadas para diferentes ocasiões
- Desejo de maximizar o uso do guarda-roupa existente

O VesteBem resolve estes problemas ao automatizar o processo de combinação de roupas, poupando tempo e ajudando os utilizadores a tirarem o máximo proveito das peças que já possuem.

## Funcionalidades Principais

### 1. Guarda-Roupa Virtual
- Upload de fotos das roupas do utilizador
- Categorização automática e manual
- Adição de metadados (cor, estilo, estação)
- Visualização organizada por categorias

### 2. Algoritmo de Combinação Inteligente
- Baseado em regras de moda e design
- Considera compatibilidade de cores
- Avalia harmonia de estilos
- Adapta-se às estações do ano

### 3. Combinações por Situação
- Casual
- Trabalho/Formal
- Desporto
- Festa
- Adaptações para clima (verão, inverno, chuva)
- Ocasiões especiais (encontros)

### 4. Interface Intuitiva
- Design inspirado em iOS
- Navegação fluida entre telas
- Visualização clara das combinações
- Feedback visual sobre qualidade das combinações

### 5. Funcionalidades Adicionais
- Favoritos para guardar combinações preferidas
- Partilha de combinações
- Geração de combinações a partir de peças específicas
- Dicas de moda para cada situação

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Armazenamento**: LocalStorage para persistência de dados
- **Processamento de Imagem**: API de Câmera e compressão de imagens
- **Algoritmos**: Sistema de pontuação e compatibilidade para combinações

## Arquitetura do Aplicativo

O aplicativo segue uma arquitetura modular com os seguintes componentes:

1. **Core (app.js)**: Funcionalidades básicas e inicialização
2. **Upload (upload.js)**: Gestão de imagens e metadados
3. **Combination (combination.js)**: Algoritmo de combinação
4. **Integration (integration.js)**: Integração entre módulos
5. **Situations (situations.js)**: Gestão de situações e regras específicas
6. **Tests (tests.js)**: Testes automatizados

## Demonstração

### Tela Inicial
A tela inicial oferece acesso rápido a todas as funcionalidades principais do aplicativo, com um design limpo e intuitivo.

### Adição de Roupas
O processo de adicionar roupas é simples e direto:
1. Capturar ou selecionar foto
2. Categorizar a peça
3. Adicionar metadados
4. Guardar no guarda-roupa virtual

### Geração de Combinações
O algoritmo inteligente cria combinações baseadas em:
- Compatibilidade de cores
- Harmonia de estilos
- Adequação à estação
- Apropriação para situações específicas

### Visualização de Situações
Cada situação tem:
- Descrição detalhada
- Regras específicas
- Dicas de moda
- Geração de combinações adaptadas

## Benefícios para o Utilizador

- **Economia de Tempo**: Decisões de vestuário mais rápidas
- **Melhor Utilização do Guarda-Roupa**: Descoberta de novas combinações com peças existentes
- **Aprendizagem de Moda**: Compreensão de regras de combinação através do uso
- **Redução de Compras Impulsivas**: Maior consciência do que já possui
- **Preparação para Ocasiões**: Facilidade em encontrar roupas adequadas para diferentes situações

## Futuras Melhorias

- **Reconhecimento de Imagem**: Categorização automática de peças
- **Sugestões de Compra**: Recomendações de peças que complementariam o guarda-roupa
- **Calendário de Outfits**: Planeamento de roupas para a semana
- **Integração com Clima**: Sugestões baseadas na previsão meteorológica
- **Versão Nativa**: Desenvolvimento de versão nativa para iOS com Swift

## Conclusão

O VesteBem representa uma solução inovadora para um problema quotidiano, combinando tecnologia e moda de forma prática e acessível. O aplicativo não só ajuda os utilizadores a vestirem-se melhor, mas também a aproveitarem ao máximo as roupas que já possuem, promovendo um consumo mais consciente.

---

© 2025 VesteBem - O seu assistente de moda pessoal
