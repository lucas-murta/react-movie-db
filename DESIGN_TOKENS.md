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

### Cores de Conteúdo

- `text-content-default` - Texto padrão
- `text-content-disable` - Texto desabilitado
- `text-content-ghost` - Texto secundário/fantasma
- `text-content-bright` - Texto brilhante (sempre branco)
- `text-content-din` - Texto escuro (sempre preto)

### Cores de Status

- `bg-status-positive` / `text-status-positive` - Sucesso (verde)
- `bg-status-warning` / `text-status-warning` - Aviso (amarelo)
- `bg-status-negative` / `text-status-negative` - Erro (vermelho)

## 🌓 Temas

### Light Theme (Padrão)

O tema claro é aplicado por padrão quando a aplicação carrega.

### Dark Theme

Para ativar o tema escuro, adicione a classe `dark` ao elemento `html`:

```javascript
document.documentElement.classList.add('dark');
```

Para remover o tema escuro:

```javascript
document.documentElement.classList.remove('dark');
```

## 📝 Exemplos de Uso

### Botões

```jsx
// Botão primário
<button className="bg-primary text-content-bright px-4 py-2 rounded">
  Botão Primário
</button>

// Botão secundário
<button className="bg-secondary text-content-bright px-4 py-2 rounded">
  Botão Secundário
</button>
```

### Cards

```jsx
<div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2">
  <h3 className="text-content-default">Título do Card</h3>
  <p className="text-content-ghost">Descrição do card</p>
</div>
```

## 🔧 Configuração Técnica

Os tokens são definidos no arquivo `src/index.css` usando CSS Custom Properties (variáveis CSS) e a nova sintaxe `@theme` do Tailwind CSS v4.

### Estrutura:

1. **CSS Variables**: Definidas em `:root` (light) e `:root.dark` (dark)
2. **@theme**: Mapeia as variáveis CSS para classes do Tailwind
3. **Automatic Switching**: O tema muda automaticamente baseado na classe `dark` no elemento `html`

## 🎯 Benefícios

- **Consistência**: Cores padronizadas em toda a aplicação
- **Manutenibilidade**: Fácil alteração de cores em um local central
- **Acessibilidade**: Suporte nativo a temas claro e escuro
- **Performance**: Uso de CSS Custom Properties para mudanças instantâneas
- **Developer Experience**: Classes Tailwind intuitivas e descritivas
