<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonText, IonToolbar } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import appFooter from '../components/AppFooter.vue'
import remainingTime from '../components/RemainingTime.vue'
// import { useRouter } from 'vue-router';
import startEnrollment from '../components/StartEnrollment.vue'
import trackEnrollment from '../components/TrackEnrollment.vue'

const etapa = ref(1)
const trackNotFound = ref()
const pageWidth = ref()
// const router = useRouter()

const queryBlock2 = ref()
const queryBlock3 = ref()

// const navigateToDetails = () => {
//     router.push('/details');
// };

function handleInput(event: { target: any }) {
  const query = event.target.value.toLowerCase()
  queryBlock2.value = query
}

function handleTrackInput(event: { target: any }) {
  const query = event.target.value.toLowerCase()
  queryBlock3.value = query
}
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://hokeopsqpxnvfhczdhzc.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhva2VvcHNxcHhudmZoY3pkaHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2NzkyNzksImV4cCI6MjA0MDI1NTI3OX0.JC5yB090108l04qPkDYL_gvDQJQX6yH8QwsIEQ58oEg'
// const supabase = createClient(supabaseUrl, supabaseKey)

// const dados = ref()

// onMounted(async () => {
//     const { data, error } = await supabase
//         .from('school')
//         .select('*')
//         dados.value = data

//         console.log(error);

// })
onMounted(async () => {
  pageWidth.value = catchPageWidth()
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <!-- <ion-title>Página Inicial</ion-title> -->
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        id="block1" class="ion-padding"
        style="padding-bottom: 4rem; background-image: linear-gradient(to bottom right, var(--ion-color-tertiary) -20%, var(--ion-color-lightaccent),var(--ion-color-secondary) 120%  );"
      >
        <div style="max-width: 992px;" class="mx-auto">
          <IonGrid>
            <IonRow>
              <IonCol style="padding: 0;" size="12" size-md="6">
                <IonRow>
                  <IonCol class="ion-hide-md-up" size="12">
                    <img alt="destaque" src="../assets/images/destaque.png" style="display: block; margin: 0 auto;">
                  </IonCol>
                  <IonCol size="12">
                    <IonText color="primary">
                      <h1 class="ion-text-left ion-text-bold" color="tertiary">
                        Pré-matrículas
                        abertas
                      </h1>
                    </IonText>
                  </IonCol>
                  <IonCol size="12">
                    <IonText color="primary">
                      <ion-label class="ion-text-uppercase">
                        encerra em:
                      </ion-label>
                    </IonText>
                  </IonCol>
                  <IonCol size="12">
                    <remainingTime t-date="2024-12-31T23:59:59" />
                  </IonCol>
                  <IonCol size="12">
                    <IonText color="primary">
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit blanditiis
                        suscipit
                        itaque vel explicabo ducimus dolor rerum, velit soluta fugit sunt
                        repudiandae id
                        ipsam, quos perferendis voluptatem reiciendis officiis odio?
                      </p>
                    </IonText>
                  </IonCol>
                  <IonCol size="12">
                    <div class="ion-padding-bottom ">
                      <IonButton href="/pre-enrollment#block2" expand="full">
                        Começar Agora
                      </IonButton>
                      <IonButton href="/pre-enrollment#block3" expand="full" color="tertiary">
                        Acompanhar
                        Pré-Matrícula
                      </IonButton>
                    </div>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol class="ion-hide-md-down my-auto" style="padding: 0;" size="12" size-md="6">
                <img alt="destaque" src="../assets/images/destaque.png" style="display: block; margin: 0 auto;">
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
      <div
        id="block2" class="ion-padding-top"
        style="background-color: var(--ion-color-secondary); padding-bottom: 4rem;"
      >
        <div style="max-width: 992px;" class="mx-auto">
          <div
            class="ion-padding-vertical"
            :class="pageWidth?.pageWidth < 992 ? 'ion-padding-start ion-padding-end' : ''"
          >
            <h2 v-if="etapa < 4" class="dark-background-title" style="padding-left: 6px;">
              Selecione {{ etapa > 1 && etapa < 3 ? 'o curso' : etapa > 2 && etapa < 4 ? 'a série' : 'a escola' }}
            </h2>
            <h2 v-else class="dark-background-title" style="padding-left: 6px;">
              Preencha o formulário
            </h2>

            <div v-if="etapa === 1" class="ion-padding-top ">
              <IonSearchbar placeholder="Buscar Escola..." @ion-input="handleInput($event)" />
            </div>
          </div>
          <startEnrollment v-model="etapa" :searchbox="queryBlock2" />
        </div>
      </div>

      <div
        id="block3" class="ion-padding-top"
        style="background-color: var(--ion-color-lightaccent); padding-bottom: 4rem; "
      >
        <div style="max-width: 992px;" class="mx-auto" :class="pageWidth?.pageWidth < 992 ? 'ion-padding' : ''">
          <h2 class="dark-background-title" style="padding-left: 6px;">
            <IonText color="primary">
              Acompanhe sua Pré-Matrícula
            </IonText>
          </h2>
          <div class="ion-padding-top">
            <IonText color="primary">
              <p>
                Digite o nome do aluno para acompanhar a pré-matrícula
              </p>
            </IonText>
          </div>
          <div class="ion-padding-top ">
            <IonSearchbar v-model="queryBlock3" placeholder="Buscar Aluno..." @ion-input="handleTrackInput($event)" />
          </div>
          <div class="ion-padding-bottom ion-padding-top">
            <trackEnrollment v-model="trackNotFound" :query="queryBlock3" />
            <div class="ion-padding-bottom ion-padding-top">
              <IonButton expand="full" href="/pre-enrollment#block2">
                Começar Agora
              </IonButton>
              <IonButton
                v-if="trackNotFound === false" expand="full" color="tertiary" @click="() => {
                  queryBlock3 = undefined
                  trackNotFound = undefined
                }"
              >
                Limpar Busca
              </IonButton>
              <IonButton
                v-else-if="trackNotFound === true" expand="full" color="tertiary" @click="() => {
                  queryBlock3 = undefined
                  trackNotFound = undefined
                }"
              >
                Buscar Outro
              </IonButton>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <appFooter />
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
h1 {
  margin-top: 20px;
  font-size: 1.8rem;
  font-weight: bolder;
}

.dark-background-title {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
