
# Top 5 Tião Carreiro & Pardinho — Frontend

Aplicação frontend em React para o projeto Top 5 Tião Carreiro & Pardinho. Exibe o top 5, lista paginada das demais músicas, permite sugestões e inclui área de administração para gerenciar músicas e sugestões.

Este README explica como rodar a aplicação localmente (modo desenvolvimento) e em Docker, além de comandos úteis e credenciais de teste.

## ⚙️ Tecnologias

- React (Create React App)
- Tailwind CSS
- Axios (cliente HTTP)
- Docker / Docker Compose (opcional)

## 🚀 Executando a aplicação

Opções disponíveis: rodar localmente com Node.js (dev) ou via Docker Compose.

### Requisitos

- Node.js 18+ (para desenvolvimento local)
- npm ou yarn
- Docker

### Preparar variáveis de ambiente

Antes de rodar a aplicação (local ou com Docker), crie um arquivo `.env` a partir do exemplo e ajuste os valores conforme necessário.

No Windows (cmd):

```cmd
copy .env.example .env
```

No macOS/Linux (bash):

```bash
cp .env.example .env
```

### Desenvolvimento (local)

1. Instale dependências:

```cmd
cd c:\Projetos\Testes\top5-tiao-carreiro-frontend
npm install
```

2. Inicie em modo desenvolvimento:

```cmd
npm start
```

A aplicação abrirá em http://localhost:3000 por padrão.

### Produção com Docker (recomendado para deploy)

1. Subir com Docker Compose:

```cmd
docker compose up -d --build
```

2. Acesse: http://localhost:3000

Observação: o docker-compose incluído assume que a API backend está disponível (por exemplo em http://localhost/api). Ajuste variáveis/serviços conforme necessário.

Observação: o `docker-compose.yml` carrega variáveis do arquivo `.env`. Veja a seção "Preparar variáveis de ambiente" acima para instruções de como criar o `.env` a partir de `.env.example`.

## 👤 Usuário de teste (admin)

Use estas credenciais para testar as rotas/proteções da área administrativa (mesmas do backend):

- Email: admin@tiaocarreiro.com
- Senha: password123

> Se a API backend ainda não tiver seeders rodados, crie ou configure um usuário admin no backend.

## 💡 Comportamento e notas de desenvolvimento

- Paginação: componentes usam paginação fornecida pela API (campo `pagination`).
- Validações: formulários usam validação simples de URL do YouTube antes de enviar.
- Estilo: Tailwind CSS, classes utilitárias no JSX.


## 🔧 Comandos úteis

```cmd
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm start

# Build de produção
npm run build

# Rodar lint (se configurado)
# npm run lint

# Docker
docker compose up --build
docker compose down
```

## Troubleshooting

- Se a aplicação não conseguir acessar a API, verifique a URL base em `src/services/apiClient.js`.
- Erros de CORS devem ser resolvidos no backend durante o desenvolvimento.
- Se o build falhar, execute `npm run build` e verifique o output para localizar componentes com JSX inválido.

---

Se quiser, adapto esse README para incluir instruções específicas do seu ambiente (variáveis de ambiente, rota da API, ou exemplo de .env).   

