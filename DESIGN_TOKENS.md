# Design Tokens - React Movie DB

Este documento descreve como usar os tokens de design configurados no projeto.

## 🎨 Tokens Disponíveis

### Cores Primárias

- `bg-primary` / `text-primary` - Cor primária do sistema (azul)
- `bg-secondary` / `text-secondary` - Cor secundária do sistema (roxo)

### Cores de Superfície

- `bg-surface-0` - Superfície mais alta (destaques)
- `bg-surface-1` - Superfície media (cards, modais)
- `bg-surface-2` - Superfície baixa (fundo da aplicação)
- `bg-surface-positive` - Superfície de sucesso (verde)
- `bg-surface-warning` - Superfície de aviso (amarelo)
- `bg-surface-negative` - Superfície de erro (vermelho)

### Cores de Conteúdo

- `text-content-default` - Texto padrão
- `text-content-disable` - Texto desabilitado
- `text-content-ghost` - Texto secundário/fantasma
- `text-content-primary` - Texto para fundos coloridos (primary, secondary, status)
- `text-content-bright` - Texto brilhante (sempre branco)
- `text-content-din` - Texto escuro (sempre preto)

## 🌓 Temas

### Detecção Automática

A aplicação detecta automaticamente as preferências de tema do sistema operacional e aplica o tema correspondente:

- **Light Theme**: Aplicado quando o sistema está configurado para modo claro
- **Dark Theme**: Aplicado quando o sistema está configurado para modo escuro

### Mudanças Dinâmicas

O tema muda automaticamente quando o usuário altera as configurações do sistema, sem necessidade de recarregar a página.

### Controle Manual (Opcional)

Se necessário, você ainda pode controlar o tema manualmente:

```javascript
// Forçar tema escuro
document.documentElement.classList.add('dark');

// Forçar tema claro
document.documentElement.classList.remove('dark');
```

## 🔧 Configuração Técnica

Os tokens são definidos no arquivo `src/index.css` usando CSS Custom Properties (variáveis CSS) e a nova sintaxe `@theme` do Tailwind CSS v4.

### Estrutura:

1. **CSS Variables**: Definidas em `:root` (light theme) e `:root.dark` (dark theme)
2. **@theme**: Mapeia as variáveis CSS para classes do Tailwind
3. **Automatic Detection**: O tema é detectado automaticamente baseado nas preferências do sistema usando `window.matchMedia('(prefers-color-scheme: dark)')`
4. **Dynamic Switching**: Responde em tempo real às mudanças de tema do sistema operacional

## 🎯 Benefícios

- **Consistência**: Cores padronizadas em toda a aplicação
- **Manutenibilidade**: Fácil alteração de cores em um local central
- **Acessibilidade**: Suporte nativo a temas claro e escuro
- **Performance**: Uso de CSS Custom Properties para mudanças instantâneas
- **Developer Experience**: Classes Tailwind intuitivas e descritivas
