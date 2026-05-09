# Como rodar o projeto

## Pré-requisitos

- Node.js instalado (recomendado: versão LTS)
- npm instalado

## Passo a passo

1. Copie o arquivo de exemplo de variáveis de ambiente para `.env`.

No Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

No macOS/Linux:

```bash
cp .env.example .env
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Pronto. O Vite vai mostrar no terminal a URL local (normalmente `http://localhost:5173`).
