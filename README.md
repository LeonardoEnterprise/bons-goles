# 🍷 Bons Goles

Um e-commerce moderno de bebidas desenvolvido com Next.js 15, focado em proporcionar uma experiência única de compra online. O projeto oferece um catálogo completo de produtos, sistema de carrinho, autenticação segura e integração com pagamentos via Stripe.

## 🚀 Sobre o Negócio

**[Bons Goles](https://www.notion.so/leonardopaniz/Projeto-Bons-Goles-18c338758fb98070a6f9e279231f91dc)** é uma plataforma de e-commerce especializada na venda de bebidas premium. Nossa missão é conectar apreciadores de boas bebidas com produtos de qualidade, oferecendo:

- 🍾 Catálogo diversificado de bebidas
- 🛒 Sistema de carrinho intuitivo
- 📦 Gestão completa de pedidos
- 🔐 Autenticação segura
- 💳 Pagamentos integrados com Stripe
- 📱 Interface responsiva e moderna

## 🛠️ Stack Tecnológica

### Desenvolvimento

Acompanhar os cards do trello do projeto, disponivel em: [Trello Bons Goles](https://trello.com/invite/b/68a5fa618cb5d4da5ac80ff2/ATTI788f7e026d862c47b4338089722d5fdaD76289E0/bons-goles).

### Frontend

- **[Next.js 15](https://nextjs.org)** - Framework React com App Router
- **[React 19](https://react.dev)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes UI reutilizáveis
- **[Lucide React](https://lucide.dev)** - Ícones modernos
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Suporte a temas

### Backend & Database

- **[Drizzle ORM](https://orm.drizzle.team)** - ORM type-safe para TypeScript
- **[PostgreSQL](https://www.postgresql.org)** - Banco de dados relacional
- **[Better Auth](https://www.better-auth.com)** - Sistema de autenticação

### Pagamentos & E-commerce

- **[Stripe](https://stripe.com)** - Processamento de pagamentos
- **[@stripe/stripe-js](https://github.com/stripe/stripe-js)** - SDK JavaScript do Stripe

### Estado & Formulários

- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado servidor
- **[React Hook Form](https://react-hook-form.com)** - Formulários performáticos
- **[Zod](https://zod.dev)** - Validação de schemas
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Resolvers para validação

### UI Components (Radix UI)

- **@radix-ui/react-accordion** - Componente de acordeão
- **@radix-ui/react-avatar** - Componente de avatar
- **@radix-ui/react-dialog** - Modais e diálogos
- **@radix-ui/react-label** - Labels acessíveis
- **@radix-ui/react-radio-group** - Grupos de radio buttons
- **@radix-ui/react-scroll-area** - Área de scroll customizada
- **@radix-ui/react-separator** - Separadores visuais
- **@radix-ui/react-slot** - Composição de componentes
- **@radix-ui/react-tabs** - Componente de abas

### Utilitários

- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais
- **[class-variance-authority](https://cva.style/docs)** - Variantes de componentes
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge de classes Tailwind
- **[react-number-format](https://s-yadav.github.io/react-number-format/)** - Formatação de números
- **[sonner](https://sonner.emilkowal.ski)** - Notificações toast

### Desenvolvimento

- **[ESLint](https://eslint.org)** - Linting de código
- **[Prettier](https://prettier.io)** - Formatação de código
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Ferramentas CLI do Drizzle
- **[tsx](https://github.com/esbuild-kit/tsx)** - Execução de TypeScript

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Stripe (para pagamentos)

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd bons-goles
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Execute as migrações do banco:

```bash
npx drizzle-kit push
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa o linting

# Telemetria
npm run telemetry:off # Desabilita telemetria do Next.js
```

## 🗄️ Comandos do Drizzle ORM

```bash
# Gerar migrações baseadas no schema
npx drizzle-kit generate

# Aplicar mudanças do schema diretamente no banco (desenvolvimento)
npx drizzle-kit push

# Executar migrações
npx drizzle-kit migrate

# Visualizar o banco de dados
npx drizzle-kit studio

# Verificar diferenças entre schema e banco
npx drizzle-kit check

# Fazer drop de migrações
npx drizzle-kit drop
```

## 🎨 Comandos do shadcn/ui

```bash
# Adicionar um novo componente
npx shadcn@latest add <component-name>

# Adicionar múltiplos componentes
npx shadcn@latest add button card dialog

# Listar componentes disponíveis
npx shadcn@latest add

# Atualizar componentes existentes
npx shadcn@latest update

# Inicializar shadcn/ui em um projeto
npx shadcn@latest init
```

## 💳 Comandos do Stripe

```bash
# Instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login no Stripe
stripe login

# Escutar webhooks localmente
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Testar webhooks
stripe trigger payment_intent.succeeded
```

## 🔧 Comandos do TanStack Query

```bash
# Instalar devtools (opcional)
npm install @tanstack/react-query-devtools

# ESLint plugin (opcional)
npm install @tanstack/eslint-plugin-query
```

## 📁 Estrutura do Projeto

```
src/
├── actions/          # Server Actions do Next.js
├── app/             # App Router (páginas e layouts)
├── components/      # Componentes React
│   ├── common/     # Componentes comuns
│   └── ui/         # Componentes UI (shadcn)
├── db/             # Configuração do banco e schema
├── helpers/        # Funções utilitárias
├── hooks/          # Custom hooks
│   ├── mutations/  # Hooks de mutação (TanStack Query)
│   └── queries/    # Hooks de consulta (TanStack Query)
├── lib/            # Bibliotecas e configurações
└── providers/      # Providers React (Context, Query, etc.)
```

## 🚀 Deploy

Link do projeto em produção: [Clique aqui](https://bons-goles.vercel.app/).
O projeto está configurado para deploy na [Vercel](https://vercel.com):

1. Conecte seu repositório na Vercel
2. Configure as variáveis de ambiente
3. O deploy será automático a cada push

Para outros provedores, execute:

```bash
npm run build
npm run start
```

## 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Stripe Documentation](https://stripe.com/docs)
- [Better Auth Documentation](https://www.better-auth.com)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
