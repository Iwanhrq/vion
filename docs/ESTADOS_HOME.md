# Estados da Tela Home

Este documento explica como testar os diferentes estados da tela Home do aplicativo.

## Estados Disponíveis

### 1. Estado com Dados
**Condição:** `ROUTERS.length > 0` E `REPORTS.length > 0`

**Como ativar:**
- Descomente os dados nos arrays `ROUTERS` e `REPORTS` no arquivo `home.tsx`

**Características:**
- Header: Escudo roxo com "100% Sua rede está segura" e subtítulo "Clique para analisar rede novamente"
- Meus Roteadores: Lista horizontal de RouterCard
- Último Relatório: Cards usando ReportCard
- "Mostrar mais" ativo

### 2. Estado Vazio
**Condição:** `ROUTERS.length === 0` E `REPORTS.length === 0`

**Como ativar:**
- Mantenha os arrays `ROUTERS` e `REPORTS` vazios (comentados) no arquivo `home.tsx`

**Características:**
- Header: Escudo roxo com "Nível de segurança indisponível" e subtítulo "Adicione seu primeiro roteador para começar a monitorar sua rede" (quebra automática de linha com maxWidth)
- Meus Roteadores: Lista horizontal com RouterCard dos roteadores adicionados + botão "+" para adicionar novo roteador
- Último Relatório: Card cinza com ícone circular vazio à esquerda e texto "Nenhum relatório disponível"
- "Mostrar mais" desativado (opacidade reduzida)
- Botões das dicas rápidas: Cor rosa fixa (#EB3C7D - buttonTertiary)

## Modal de Adicionar Roteador

### Funcionalidades
- **Abertura:** Clique no botão "+" na seção "Meus roteadores"
- **Comportamento:** Roteadores adicionados aparecem na lista horizontal como RouterCard
- **Persistência:** Roteadores ficam visíveis até o app ser fechado (estado temporário)
- **Campos:**
  - Nome do roteador (obrigatório)
  - Descrição (opcional)
- **Validação:** Nome é obrigatório
- **Ações:**
  - Confirmar: Valida e fecha modal
  - Cancelar: Fecha modal sem salvar

### Texto Explicativo
"Para adicionar um roteador, conecte-se à rede Wi-Fi que deseja monitorar e confirme as informações abaixo."

## Como Testar

### Teste Estado Vazio
1. Abra o arquivo `vion/app/(tabs)/home.tsx`
2. Certifique-se que os arrays `ROUTERS` e `REPORTS` estão vazios/comentados
3. Execute o aplicativo
4. Verifique se o estado vazio é exibido corretamente
5. Teste o modal clicando no card "+"

### Teste Estado com Dados
1. Abra o arquivo `vion/app/(tabs)/home.tsx`
2. Descomente os dados nos arrays `ROUTERS` e `REPORTS`
3. Execute o aplicativo
4. Verifique se o estado com dados é exibido corretamente

### Teste Transições
1. Teste alternando entre os estados
2. Verifique se a renderização condicional funciona corretamente
3. Confirme que os componentes se adaptam aos diferentes estados

## Componentes Reutilizados

- `NetworkStatusHeader`: Adaptado para diferentes textos
- `RouterCard`: Mantido para estado com dados
- `ReportCard`: Mantido para estado com dados
- `TipCard`: Mantido em ambos os estados
- `SectionTitle`: Mantido em ambos os estados

## Novos Componentes

- **Empty Router Card**: Card com ícone "+" para adicionar roteador
- **Empty Report Card**: Card cinza com ícone circular vazio
- **Add Router Modal**: Modal para cadastro de roteador

## Responsividade

Todos os componentes são responsivos e se adaptam a diferentes tamanhos de tela, mantendo a fidelidade ao design das UIs fornecidas.
