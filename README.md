# CitizenHub

Monorepo com **backend** em Laravel 13 (API) e **frontend** em React 19 + Vite 8, com PostgreSQL 17, tudo rodando em Docker.

```
CitizenHub/
├── backend/            # Laravel (API REST)
├── frontend/           # React + Vite
├── docker/             # Dockerfile do PHP e config do Nginx
├── docker-compose.yml
└── .env                # portas e credenciais usadas pelo docker-compose
```

## Serviços

| Serviço  | Container            | Porta | Função                                   |
|----------|----------------------|-------|------------------------------------------|
| frontend | citizenhub-frontend  | 5173  | Vite dev server (React, HMR)             |
| nginx    | citizenhub-nginx     | 8000  | Servidor web da API                      |
| backend  | citizenhub-backend   | —     | PHP 8.4-FPM (Laravel)                    |
| db       | citizenhub-db        | 5432  | PostgreSQL 17                            |

O Vite faz **proxy de `/api/*` para o Laravel**, então o frontend chama `fetch('/api/...')`
sem precisar de URL absoluta nem CORS em desenvolvimento.

## Como rodar

```bash
cp .env.example .env                  # se ainda não existir
cp backend/.env.example backend/.env  # se ainda não existir
docker compose up -d --build
```

Na primeira subida o backend instala as dependências do Composer, gera a `APP_KEY` e roda as
migrations; o frontend roda `npm install` e `npm run dev`.

- Frontend: http://localhost:5173
- API: http://localhost:8000/api/health

## Comandos úteis

```bash
# Backend
docker compose exec backend php artisan migrate
docker compose exec backend php artisan make:controller NomeController --api
docker compose exec backend composer require <pacote>

# Frontend
docker compose exec frontend npm install <pacote>
docker compose exec frontend npm run build   # gera frontend/dist
docker compose exec frontend npm run lint

# Banco
docker compose exec db psql -U citizenhub citizenhub

docker compose down       # parar (use -v para apagar o banco)
```

## Onde fica o quê

- Rotas da API: `backend/routes/api.php` (prefixo `/api`)
- Proxy e configuração do Vite: `frontend/vite.config.js`

### Frontend (`frontend/src/`)

| Caminho                  | Conteúdo                                                    |
|--------------------------|-------------------------------------------------------------|
| `pages/`                 | `Login`, `Register`, `Dashboard`, `ComingSoon`              |
| `components/auth/`       | Layout das telas de login/registro e guards de rota         |
| `components/layout/`     | Sidebar, Topbar e layout do dashboard                       |
| `components/dashboard/`  | Cards do dashboard (documentos, etapas, próximos passos...) |
| `components/chat/`       | Chat flutuante de atendimento                               |
| `contexts/`              | `AuthContext` + hook `useAuth`                              |
| `services/`              | Cliente HTTP (`api.js`), `authService`, `chatService`       |
| `data/`                  | Dados mockados do dashboard e lista de cidadanias           |

Rotas: `/login`, `/register`, `/dashboard` (protegida) e `/dashboard/*` (seções em construção).

> ⚠️ **Mocks:** enquanto o backend não existe, `authService` guarda usuários no
> `localStorage`, `chatService` responde por palavra-chave e o dashboard usa
> `data/dashboard.js`. Cada função traz comentada a chamada `api(...)` que deve
> substituí-la quando os endpoints existirem (`POST /api/login`, `POST /api/register`,
> `GET /api/user`, `POST /api/logout`, `POST /api/chat/messages`).
