# EduPrime OpenSource

EduPrime é um ERP modular para escolas, desenvolvido usando Ionic Framework 8 com Vue 3. Cada módulo (por exemplo, cadastro de alunos, cadastro de escolas, cadastro de professores) é gerenciado de forma independente usando Bit e submódulos Git.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
myERPApp/
├── src/
│   ├── components/
│   ├── modules/
│   │   ├── student-registration/
│   │   ├── school-registration/
│   │   └── teacher-registration/
│   ├── views/
│   ├── App.vue
│   └── main.ts
├── public/
├── bit.json
├── package.json
└── ionic.config.json
```

## Como Adicionar um Novo Módulo

### 1. Criar um Repositório para o Módulo

Crie um novo repositório para o módulo que você deseja adicionar. Por exemplo, para um módulo de "Cadastro de Turmas":

1. Vá ao GitHub ou qualquer outro serviço de hospedagem de código e crie um novo repositório chamado `class-registration`.

### 2. Inicializar o Bit no Novo Repositório

Clone o repositório e inicialize um workspace do Bit:

```bash
git clone https://github.com/seu-usuario/class-registration.git
cd class-registration
bit init
```

### 3. Criar o Componente do Módulo

Crie o componente usando o Bit. Por exemplo:

```bash
bit create component modules/class-registration
```

### 4. Desenvolver o Componente

Edite o componente `ClassRegistration.vue` dentro do seu workspace Bit:

```vue
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

### 5. Adicionar e Tag Components

Adicione e faça o tag dos componentes:

```bash
bit add src/components/ClassRegistration.vue
bit tag --all
```

### 6. Publicar Componentes (Opcional)

Você pode publicar os componentes para um registry local ou apenas manter no repositório Git.

### 7. Adicionar o Módulo como Submódulo no Projeto Principal

No diretório do projeto principal EduPrime, adicione o módulo como submódulo Git:

```bash
cd myERPApp
git submodule add https://github.com/seu-usuario/class-registration.git src/modules/class-registration
git submodule init
git submodule update
```

### 8. Configurar Rotas no Projeto Principal

Edite o arquivo `router/index.js` no projeto principal para adicionar a rota do novo módulo:

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StudentRegistration from '../modules/student-registration/src/components/StudentRegistration.vue'
import SchoolRegistration from '../modules/school-registration/src/components/SchoolRegistration.vue'
import TeacherRegistration from '../modules/teacher-registration/src/components/TeacherRegistration.vue'
import ClassRegistration from '../modules/class-registration/src/components/ClassRegistration.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/student-registration', component: StudentRegistration },
  { path: '/school-registration', component: SchoolRegistration },
  { path: '/teacher-registration', component: TeacherRegistration },
  { path: '/class-registration', component: ClassRegistration },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

### 9. Importar e Usar o Componente no `App.vue`

Importe e use o componente do novo módulo no `App.vue` ou em outros componentes conforme necessário:

```vue
<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import StudentRegistration from './modules/student-registration/src/components/StudentRegistration.vue'
import SchoolRegistration from './modules/school-registration/src/components/SchoolRegistration.vue'
import TeacherRegistration from './modules/teacher-registration/src/components/TeacherRegistration.vue'
import ClassRegistration from './modules/class-registration/src/components/ClassRegistration.vue'
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
```

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
