# Clean Architecture do Front-end

Este projeto foi organizado para separar regras de negócio, casos de uso e detalhes externos como HTTP, `localStorage`, React e React Router.

## Camadas

### Entidades de Domínio (`src/domain`)
- `entities.ts`: contratos centrais da aplicação, como usuário autenticado, sessão, cliente, pet, serviço, profissional, agenda e disponibilidade.
- Não depende de React, Axios, browser APIs ou rotas.

### Interfaces / Ports (`src/application/ports`)
- `authRepository.ts`: porta para autenticação.
- `sessionStorage.ts`: porta para persistência da sessão.
- `dashboardRepository.ts`: porta para operações do painel.
- `availabilityGateway.ts`: porta para consulta de disponibilidade.

### Casos de Uso / Application Services (`src/application/use-cases`)
- `authUseCases.ts`: login, cadastro, sessão armazenada, validação de sessão e logout.
- `dashboardUseCases.ts`: carregamento do dashboard, persistência dos recursos, atualização de perfil, exclusões e cancelamento de agenda.
- `availabilityUseCases.ts`: consulta de disponibilidade mensal e diária.

### Gateways, Repositórios e Integrações Externas (`src/infrastructure`)
- `http/apiClient.ts`: configuração do Axios e interceptors.
- `storage/browserSessionStorage.ts`: adaptação do `localStorage` para a porta de sessão.
- `repositories/axiosAuthRepository.ts`: gateway HTTP de autenticação.
- `repositories/axiosDashboardRepository.ts`: gateway HTTP do dashboard.
- `repositories/axiosAvailabilityGateway.ts`: gateway HTTP de disponibilidade.

### Controllers, Presenters e Adapters (`src/interface-adapters`)
- `controllers`: compõem casos de uso com implementações concretas de infraestrutura.
- `presenters/errorPresenter.ts`: transforma erros externos em mensagens ou estados entendíveis pela UI.
- `presenters/profilePresenter.ts`: transforma entidades de perfil em estado de formulário.

### Frameworks e UI (`src/pages`, `src/components`, `src/context`, `src/routes`, `src/hooks`)
- Telas, componentes, contexto e rotas chamam controllers e presenters.
- Detalhes como React, JSX e navegação ficam nas bordas da aplicação.

## Fluxo de dependências

```text
React/UI -> Interface Adapters -> Application Use Cases -> Ports -> Domain
                        Infrastructure -> Ports
```

Regras principais:
1. Domínio não importa nenhuma camada externa.
2. Casos de uso dependem apenas do domínio e das portas.
3. Infraestrutura implementa portas e pode conhecer Axios/browser APIs.
4. UI chama controllers/presenters, sem chamar Axios diretamente.
5. A direção do código protege o núcleo da aplicação contra mudanças de framework, API HTTP ou armazenamento local.
