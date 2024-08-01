
# Eduprime Monorepo

**Eduprime Monorepo** é um projeto de gestão pedagógica que utiliza uma estrutura de monorepo para gerenciar tanto o frontend quanto o backend de forma eficiente e escalável. Este repositório é configurado com tecnologias modernas e aproveita os benefícios do Turborepo para otimizar o desenvolvimento e a manutenção.

## Estrutura do Projeto

```
/eduprime-monorepo
  /frontend                  # Aplicação frontend com Ionic e Vue.js
    - package.json
    - ionic.config.json
    - src/
    - public/
  /backend                   # Aplicação backend com Node.js e PostgREST (Submódulo Git)
    - package.json
    - docker-compose.yml
    - .env
    - src/
    - prisma/
  /node_modules              # Módulos Node.js
  /.turbo                    # Diretório de cache do Turborepo
  .gitignore                 # Arquivos e diretórios ignorados pelo Git
  .gitmodules                # Configuração de submódulos Git
  package.json               # Configuração raiz do monorepo
  pnpm-lock.yaml             # Arquivo de lock do pnpm
  pnpm-workspace.yaml        # Configuração dos workspaces do pnpm
  turbo.json                 # Configuração do Turborepo
```

## Tecnologias Utilizadas

- **Frontend:** Ionic, Vue.js, Vite
- **Backend:** Node.js, Express, Prisma, PostgREST
- **Banco de Dados:** TimescaleDB gerenciado pelo Docker
- **Gerenciamento de Monorepo:** Turborepo
- **Gerenciamento de Dependências:** pnpm
- **Integração de Submódulo Git:** Backend gerenciado como um submódulo Git

## Vantagens do Uso de Submódulo Git

- **Modularidade:** Facilita o desenvolvimento e a manutenção do backend de forma independente.
- **Reutilização de Código:** Permite reutilizar o backend em diferentes projetos.
- **Histórico de Versões:** Mantém um histórico de versões separado para o backend, facilitando a gestão de mudanças.

## Vantagens do Monorepo com Turborepo

- **Execução Paralela de Tarefas:** Turborepo permite executar múltiplas tarefas em paralelo, aumentando a eficiência do build e dos testes.
- **Caching Inteligente:** Cacheia tarefas de forma inteligente, evitando a execução redundante e economizando tempo.
- **Builds Incrementais:** Apenas as partes alteradas do projeto são reconstruídas, acelerando o processo de build.
- **Remote Caching:** Suporta caching remoto para compartilhar caches entre diferentes ambientes de desenvolvimento e pipelines CI/CD.
- **Simplificação do Desenvolvimento:** Centraliza o gerenciamento de pacotes, facilitando a coordenação entre frontend e backend.
- **Pre/Post Hooks:** Permite a execução de comandos antes e depois das tarefas para preparação e limpeza do ambiente.

## Como Atualizar o Submódulo Git do Backend

Para atualizar o submódulo Git do backend para a última versão, siga os passos abaixo:

1. **Inicializar Submódulos (se ainda não tiver sido feito):**

   ```bash
   git submodule init
   ```

2. **Atualizar o Submódulo:**

   ```bash
   git submodule update --remote --merge
   ```

   Este comando vai buscar as últimas mudanças no repositório do submódulo e mesclá-las no estado atual do submódulo dentro do seu projeto.

3. **Commitar a Atualização do Submódulo:**

   Após atualizar o submódulo, faça um commit das mudanças no superprojeto (monorepo).

   ```bash
   git add backend
   git commit -m "Atualiza submódulo backend para a última versão"
   ```

## Como Executar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 20.x e pnpm instalados

### Comandos

#### Iniciar o Ambiente de Desenvolvimento

```bash
pnpm turbo run dev
```

Este comando irá iniciar o servidor de desenvolvimento para o frontend em `http://localhost:8101` e subir os serviços backend com Docker.

#### Parar os Serviços Docker

```bash
pnpm turbo run docker:stop --filter=eduprime.backend
```

Use este comando para parar e remover os containers Docker após o desenvolvimento.

### Executar Outros Scripts

- **Iniciar os Containers Docker:**
  
  ```bash
  pnpm turbo run docker:start --filter=eduprime.backend
  ```

- **Verificar Logs do Docker:**
  
  ```bash
  pnpm turbo run docker:logs --filter=eduprime.backend
  ```

- **Rodar o Servidor de Desenvolvimento:**
  
  ```bash
  pnpm turbo run dev --filter=eduprime.backend
  ```

## Links Úteis

- [Documentação do Ionic](https://ionicframework.com/docs)
- [Documentação do Turborepo](https://turbo.build/repo/docs)
- [Documentação do pnpm](https://pnpm.io)
- [Documentação do Docker](https://docs.docker.com)

---

**Eduprime Monorepo** é um projeto contínuo, focado em melhorar a eficiência e a experiência de desenvolvimento para soluções educacionais. Para dúvidas ou contribuições, entre em contato com o autor do projeto.
