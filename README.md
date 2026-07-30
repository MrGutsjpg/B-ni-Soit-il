<<<<<<< HEAD
# B-ni-Soit-il
site de uma panificação/ confeitaria francesa
=======
# Béni Soit-Il — Site

Scaffold inicial do site usando Astro + Tailwind.

Instalação e execução:

```bash
npm install
npm run dev
```

Arquivos principais:
- `src/pages/index.astro` — home com seções iniciais
- `src/components` — Header, Hero, Gallery, Contact
- `src/styles/global.css` — estilos e variáveis de cor (Tailwind)

Próximos passos:
- Substituir `public/images/placeholder.svg` por fotos reais
- Implementar página `/cardapio` e `/encomendas` (opcional: Supabase)
- Ajustar textos, horários e contatos reais

Informações da loja:

- Endereço: Avenida Europa, 105 — Londrina, PR
- Horário: 07:45–18:00
- WhatsApp: +55 43 99178-8577

Fonte serif (alternativa gratuita):

Usei `Cormorant Garamond` (Google Fonts) como alternativa gratuita à fonte `Nectar`. Se preferir a `Nectar`, coloque `Nectar.woff2` em `public/fonts/` e eu ajusto para usá-la.




 Deploy rápido
 - Vercel: crie um projeto apontando para este repositório, adicione as variáveis de ambiente do `.env` no dashboard do Vercel (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `ADMIN_TOKEN`) e o deploy ocorrerá automaticamente.
 - Netlify: configure as env vars em Site settings → Build & deploy → Environment.

 CI
 - Um workflow GitHub Actions foi adicionado em `.github/workflows/ci.yml` para executar `npm ci` e `npm run build` em pushes para `main`.

 Arquivos importantes
 - `.env.example` — exemplo de variáveis de ambiente.
 - `README.md` — instruções principais.

Notificações
- Para habilitar notificações configure as variáveis de ambiente:

```
WEBHOOK_URL=https://hooks.exemplo.com/receber
NOTIFY_EMAIL_TO=seu@email.com
SMTP_HOST=smtp.exemplo.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASS=senha
```

O sistema tentará enviar um webhook com o JSON do pedido e, se o SMTP estiver configurado, enviará um e-mail com os detalhes.

WhatsApp (Twilio)
- Para enviar notificações via WhatsApp automaticamente, configure as variáveis do Twilio:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+1415XXXXXXX
SHOP_WHATSAPP=+5543991788577
SEND_CONFIRM_TO_CUSTOMER=true # enviar confirmação também para cliente quando possível
```

O código usa a API Twilio quando as variáveis estiverem presentes. Caso não, continuará usando webhook/email/local fallback.

Depois que você adicionar as chaves eu posso completar a autenticação (login por magic link) e implementar endpoints para gerenciar cardápio, pedidos e clientes.

SQL (schema) sugerido para criar no Supabase (execute no SQL editor):

```sql
create table products (
	id bigserial primary key,
	title text,
	description text,
	price numeric,
	image text,
	created_at timestamptz default now()
);

create table orders (
	id bigserial primary key,
	name text,
	contact text,
	product text,
	quantity int,
	date date,
	notes text,
	createdAt timestamptz default now()
);

create table clients (
	id bigserial primary key,
	name text,
	contact text,
	created_at timestamptz default now()
);
```

Também crie um bucket de storage chamado `product-images` para os uploads de fotos.

Protegendo endpoints server-side
- Para operações mais seguras (ex.: rotas que usam a `service_role` key), eu adicionei endpoints em `/api/supabase/*` que exigem um header `x-admin-token` com o valor igual a `ADMIN_TOKEN` definido no `.env`.
- Configure no `.env`:

```
# Béni Soit-Il — Site

Scaffold inicial do site usando Astro + Tailwind.

Instalação e execução:

```bash
npm install
npm run dev
```

Arquivos principais:
- `src/pages/index.astro` — home com seções iniciais
- `src/components` — Header, Hero, Gallery, Contact
- `src/styles/global.css` — estilos e variáveis de cor (Tailwind)

Próximos passos:
- Substituir `public/images/placeholder.svg` por fotos reais
- Implementar página `/cardapio` e `/encomendas` (opcional: Supabase)
- Ajustar textos, horários e contatos reais

Informações da loja:

- Endereço: Avenida Europa, 105 — Londrina, PR
- Horário: 07:45–18:00
- WhatsApp: +55 43 99178-8577

Fonte serif (alternativa gratuita):

Usei `Cormorant Garamond` (Google Fonts) como alternativa gratuita à fonte `Nectar`. Se preferir a `Nectar`, coloque `Nectar.woff2` em `public/fonts/` e eu ajusto para usá-la.



 Deploy rápido
 - Vercel: crie um projeto apontando para este repositório, adicione as variáveis de ambiente do `.env` no dashboard do Vercel (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `ADMIN_TOKEN`) e o deploy ocorrerá automaticamente.
 - Netlify: configure as env vars em Site settings → Build & deploy → Environment.

 CI
 - Um workflow GitHub Actions foi adicionado em `.github/workflows/ci.yml` para executar `npm ci` e `npm run build` em pushes para `main`.

 Arquivos importantes
 - `.env.example` — exemplo de variáveis de ambiente.
 - `README.md` — instruções principais.

Notificações
- Para habilitar notificações configure as variáveis de ambiente:

```
WEBHOOK_URL=https://hooks.exemplo.com/receber
NOTIFY_EMAIL_TO=seu@email.com
SMTP_HOST=smtp.exemplo.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASS=senha
```

O sistema tentará enviar um webhook com o JSON do pedido e, se o SMTP estiver configurado, enviará um e-mail com os detalhes.

WhatsApp (Twilio)
- Para enviar notificações via WhatsApp automaticamente, configure as variáveis do Twilio:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+1415XXXXXXX
SHOP_WHATSAPP=+5543991788577
SEND_CONFIRM_TO_CUSTOMER=true # enviar confirmação também para cliente quando possível
```

O código usa a API Twilio quando as variáveis estiverem presentes. Caso não, continuará usando webhook/email/local fallback.

Depois que você adicionar as chaves eu posso completar a autenticação (login por magic link) e implementar endpoints para gerenciar cardápio, pedidos e clientes.

SQL (schema) sugerido para criar no Supabase (execute no SQL editor):

```sql
create table products (
	id bigserial primary key,
	title text,
	description text,
	price numeric,
	image text,
	created_at timestamptz default now()
);

create table orders (
	id bigserial primary key,
	name text,
	contact text,
	product text,
	quantity int,
	date date,
	notes text,
	createdAt timestamptz default now()
);

create table clients (
	id bigserial primary key,
	name text,
	contact text,
	created_at timestamptz default now()
);
```

Também crie um bucket de storage chamado `product-images` para os uploads de fotos.

Protegendo endpoints server-side
- Para operações mais seguras (ex.: rotas que usam a `service_role` key), eu adicionei endpoints em `/api/supabase/*` que exigem um header `x-admin-token` com o valor igual a `ADMIN_TOKEN` definido no `.env`.
- Configure no `.env`:

```
SUPABASE_SERVICE_KEY=your-service-role-key
ADMIN_TOKEN=uma-string-segura-aqui
```

Esses endpoints permitem chamadas server-side seguras para listar/criar/atualizar/excluir produtos, listar pedidos e gerenciar clientes. O painel admin principal usa autenticação do Supabase (magic link) e o cliente front-end para chamadas ao banco.
