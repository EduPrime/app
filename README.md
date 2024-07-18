# EduPrime OpenSource

EduPrime é um ERP modular para escolas, desenvolvido usando Ionic Framework 8 com Vue 3. Cada módulo (por exemplo, cadastro de alunos, cadastro de escolas, cadastro de professores) é gerenciado de forma independente usando submódulos Git.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
EduPrime/
├── src/
│   ├── components/
│   ├── modules/
│   │   ├── student-registration/
│   │   ├── school-registration/
│   │   └── teacher-registration/
│   │       ├── views/
│   │       ├── services/
│   │       ├── index.ts
│   │       └── routes.ts
│   ├── views/
│   ├── App.vue
│   └── main.ts
├── public/
├── package.json
└── ionic.config.json
```

## Como Adicionar um Novo Módulo

### 1. Criar um Repositório para o Módulo

Crie um novo repositório para o módulo que você deseja adicionar. Por exemplo, para um módulo de "Cadastro de Turmas":

1. Vá ao GitHub ou qualquer outro serviço de hospedagem de código e crie um novo repositório chamado `class-registration`.

### 2. Estruturar o Módulo

No novo repositório, crie a estrutura necessária:

```bash
mkdir -p src/modules/class-registration/views
mkdir -p src/modules/class-registration/services
touch src/modules/class-registration/index.ts
touch src/modules/class-registration/routes.ts
```

### 3. Desenvolver o Módulo

Edite os arquivos conforme necessário.

#### `ClassRegistration.vue`

Este é o componente de visualização principal para o módulo, onde você definirá a interface do usuário.

```vue
<!-- src/modules/class-registration/views/ClassRegistration.vue -->
<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'

defineProps({})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cadastro de Turmas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Formulário de Cadastro de Turmas -->
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Seu estilo aqui */
</style>
```

#### `index.ts`

Este arquivo é usado para exportar os componentes ou serviços que você deseja disponibilizar a partir deste módulo.

```typescript
// src/modules/class-registration/index.ts
export { default as ClassRegistration } from './views/ClassRegistration.vue'
```

#### `routes.ts`

Neste arquivo, você define as rotas específicas para o módulo, incluindo propriedades `meta` para controle de navegação e organização.

```typescript
// src/modules/class-registration/routes.ts
import { school } from 'ionicons/icons'
import ClassRegistration from './views/ClassRegistration.vue'

const routes = [
  {
    path: '/class-registration',
    name: 'ClassRegistration',
    component: ClassRegistration,
    meta: {
      moduleName: 'ClassRegistration',
      moduleIcon: school,
      icon: school,
      name: 'Cadastro de Turmas',
      order: 1,
    },
  },
]

export default routes
```

### 4. Adicionar o Módulo como Submódulo no Projeto Principal

No diretório do projeto principal EduPrime, adicione o módulo como submódulo Git:

```bash
cd EduPrime/src/modules
git submodule add https://github.com/seu-usuario/class-registration.git class-registration
git submodule init
git submodule update
```

### 5. Configurar Rotas no Projeto Principal

As rotas do novo módulo serão importadas automaticamente para o projeto global do Ionic. Ao definir suas rotas no módulo e adicionar o módulo ao projeto principal, o sistema irá carregar essas rotas e disponibilizá-las no roteador principal.

### 6. Importar Componentes Globalmente no `main.ts`

Os componentes do novo módulo serão importados automaticamente para o projeto global do Ionic. Isso significa que qualquer componente definido e exportado em `index.ts` do módulo estará disponível globalmente no projeto, sem necessidade de importações adicionais.

### 7. Ajustar o Menu no `App.vue`

A estrutura do menu será gerada dinamicamente com base nas rotas definidas nos módulos. Ao carregar as rotas no projeto principal, o sistema construirá o menu com base nas propriedades `meta` definidas em cada rota, garantindo uma navegação consistente e organizada.

## Manutenção e Atualização de Submódulos

Para atualizar os submódulos, navegue até o diretório de cada módulo, faça as alterações necessárias e commite:

```bash
cd src/modules/class-registration
# Fazer alterações
git add .
git commit -m "Atualizar componente de cadastro de turmas"
git push origin main
```

Depois, no projeto principal, atualize os submódulos:

```bash
git submodule update --remote
```

## Conclusão

Seguindo essas instruções, você poderá adicionar e integrar novos módulos ao EduPrime de forma modular e organizada. Isso facilita a colaboração e a manutenção do projeto, permitindo que cada módulo seja desenvolvido e gerenciado de forma independente.
