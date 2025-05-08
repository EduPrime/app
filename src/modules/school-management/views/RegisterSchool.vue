<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apps, schoolSharp } from 'ionicons/icons'
import { IonButton, IonAccordionGroup, IonInput, IonSelect, IonSelectOption, IonSegment, IonSegmentView ,IonSegmentContent, IonSegmentButton, IonIcon, IonAccordion, IonItem, IonLabel, IonContent } from '@ionic/vue'
import SchoolForm from '../../school-management/components/SchoolForm.vue'
import type { SchoolSettings, School } from '@prisma/client'
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineRule } from "vee-validate";

// Define validation rules
defineRule("required", (value) => {
  return value ? true : "Este campo é obrigatório.";
});

defineRule("email", (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "E-mail inválido.";
});

defineRule("cnpj", (value) => {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cnpjRegex.test(value) || "CNPJ inválido.";
});

defineRule("postalCode", (value) => {
  const postalCodeRegex = /^\d{5}-\d{3}$/;
  return postalCodeRegex.test(value) || "CEP inválido.";
});

defineRule("min", (value, [min]) => {
  return value.length >= min || `O campo deve ter pelo menos ${min} caracteres.`;
});

defineRule("max", (value, [max]) => {
  return value.length <= max || `O campo deve ter no máximo ${max} caracteres.`;
});

const schoolFormRef = ref<InstanceType<typeof SchoolForm> | null>(null)
const router = useRouter()
const school = ref<School>({
  id: '',
  name: '',
  idpes: null,
  cnpj: null,
  address: null,
  city: null,
  state: null,
  postalCode: null,
  phone: null,
  institutionId: '',
  active: null,
  abbreviation: null,
  longitude: null,
  latitude: null,
  totalArea: null,
  builtArea: null,
  availableArea: null,
  acronym: null,
  blockDiaryEntries: null,
  operationalStatus: null,
  administrativeDependency: null, regulation: null,
  logoUrl: null,
  access: null,
  managerid: null,
  managerPosition: null,
  operationLocation: null,
  condition: null,
  sharedSchooLinePCode: null,
  creationDecree: null,
  numberOfFloors: null,
  floorType: null,
  energyMeter: null,
  hasExternalArea: null,
  metadata: null,
  createdAt: null,
  deletedAt: null,
  updatedAt: null,
  updatedBy: null,
  tenantId: null,
  userCreated: null,
})
const schoolSettings = ref<SchoolSettings>({
  id: '',
  createdAt: new Date(),
  dateOpening: null,
  dateClosing: null,
  schoolDays: null,
  dateStart: null,
  dateEnd: null,
  institutionId: '',
  schoolId: '',
  updatedAt: null,
  updatedBy: null,
  tenantId: null,
  userCreated: null,
  deletedAt: null
})

const formValues = ref({
  inepCode: "",
  schoolName: "",
  corporateName: "",
  cnpj: "",
  educationNetwork: "",
  phone1: "",
  phone2: "",
  email: "",
  website: "",
  acronym: "",
  operationalStatus: "",
  administrativeDependence: "",
  postalCode: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  district: "",
  operatingLocation: "",
  buildingUsage: "",
  sharedSchool: false,
  sharedSchoolINEPCode: "",
  potableWaterAvailable: false,
  electricityAvailable: false,
  sewageAvailable: false,
  wasteDisposal: "",
  wasteTreatmentBySchool: false,
  foodServiceAvailable: false,
  communitySharedSpaces: false,
  usesSurroundingSpaces: false,
  specificFacilities: false,
  internetAvailable: false,
  connectionType: "",
  availableDesktops: 0,
  availableLaptops: 0,
  availableTablets: 0,
  // Add other fields as needed...
});

import type { SubmissionHandler } from "vee-validate";

const handleSubmit: SubmissionHandler<typeof formValues.value> = (values) => {
  console.log("Form submitted:", values);
};

function handleCancel() {
  router.push({ name: 'InstitutionListInstitutions' })
}

function handleSave() {
  schoolFormRef.value?.registerSchool()
}
</script>

<template>
  <Form @submit="handleSubmit as SubmissionHandler">
    <ion-segment mode="ios" :scrollable="false"
      style="margin: 20px 0 0 0; padding: 3px 0 3px 0; font-size: 10px;" :style="{}" >
      <ion-segment-button value="general" content-id="general">
        <ion-label>Dados Gerais</ion-label>
      </ion-segment-button>
      <ion-segment-button value="complementary" content-id="complementary">
        <ion-label>Informações Complementares</ion-label>
      </ion-segment-button>
    </ion-segment>

    <div class="ion-margin style-purple-lane" style="display: flex; align-items: center;">
      <IonIcon :icon="schoolSharp" style="margin-right: 10px;" />
      Nova escola
    </div>

    <ion-segment-view>
      <ion-segment-content id="general">
        <Field name="inepCode" rules="required" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="Código INEP" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="schoolName" rules="required" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="Nome da Escola" label-placement="stacked" fill="outline" placeholder="Digite o nome da escola" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="corporateName" rules="required" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="Razão Social" label-placement="stacked" fill="outline" placeholder="Digite a razão social" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="cnpj" rules="required|cnpj" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="CNPJ" label-placement="stacked" fill="outline" placeholder="Digite o CNPJ" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="educationNetwork" rules="required" v-slot="{ field, errors }">
          <IonSelect v-bind="field" label="Rede de Ensino" label-placement="stacked" fill="outline" placeholder="Selecione a rede de ensino">
            <IonSelectOption value="Pública">Pública</IonSelectOption>
            <IonSelectOption value="Privada">Privada</IonSelectOption>
          </IonSelect>
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="phone1" rules="required" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="Telefone 1" label-placement="stacked" fill="outline" placeholder="Digite o telefone 1" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="email" rules="email" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="E-mail" label-placement="stacked" fill="outline" placeholder="Digite o e-mail" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="postalCode" rules="required|postalCode" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="CEP" label-placement="stacked" fill="outline" placeholder="Digite o CEP" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="address" rules="required" v-slot="{ field, errors }">
          <IonInput v-bind="field" label="Endereço" label-placement="stacked" fill="outline" placeholder="Digite o endereço" />
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <Field name="operatingLocation" rules="required" v-slot="{ field, errors }">
          <IonSelect v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
            <IonSelectOption value="Própria">Própria</IonSelectOption>
            <IonSelectOption value="Alugada">Alugada</IonSelectOption>
          </IonSelect>
          <span class="error-message">{{ errors[0] }}</span>
        </Field>

        <!-- Add other fields similarly -->
      <!-- </IonCardContent>
    </IonCard> -->

      </ion-segment-content>

      <ion-segment-content id="complementary">

        <IonAccordionGroup>

          <IonAccordion value="infrastructure">
            <IonItem slot="header" color="light">
              <IonLabel>Infraestrutura</IonLabel>
            </IonItem>
            <div class="ion-padding" slot="content">
              <Field name="operatingLocation" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
                  <IonSelectOption value="Próprio">Próprio</IonSelectOption>
                  <IonSelectOption value="Alugado">Alugado</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="buildingUsage" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Forma de Ocupação do Prédio" label-placement="stacked" fill="outline" placeholder="Selecione a forma de ocupação">
                  <IonSelectOption value="Exclusivo">Exclusivo</IonSelectOption>
                  <IonSelectOption value="Compartilhado">Compartilhado</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="sharedSchool" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Escola Compartilhada?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="sharedSchoolINEPCode" v-slot="{ field, errors }">
                <IonInput v-bind="field" label="Código INEP da escola compartilhada" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="potableWaterAvailable" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Água potável disponível" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="electricityAvailable" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Fonte de energia elétrica" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="sewageAvailable" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Esgotamento sanitário adequado" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="wasteDisposal" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Destinação do lixo" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Coleta Regular">Coleta Regular</IonSelectOption>
                  <IonSelectOption value="Reciclagem">Reciclagem</IonSelectOption>
                  <IonSelectOption value="Outro">Outro</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="wasteTreatmentBySchool" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Tratamento de resíduos realizado pela escola" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="foodServiceAvailable" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Oferece alimentação escolar aos alunos?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="communitySharedSpaces" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Compartilha espaços com a comunidade?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>

              <Field name="usesSurroundingSpaces" rules="required" v-slot="{ field, errors }">
                <IonSelect v-bind="field" label="Utiliza equipamentos do entorno escolar para atividades educacionais?" label-placement="stacked" fill="outline" placeholder="Selecione uma opção">
                  <IonSelectOption value="Sim">Sim</IonSelectOption>
                  <IonSelectOption value="Não">Não</IonSelectOption>
                </IonSelect>
                <span class="error-message">{{ errors[0] }}</span>
              </Field>
            </div>
            </IonAccordion>

            <IonAccordion value="facilities">
              <IonItem slot="header" color="light">
                <IonLabel>Dependências</IonLabel>
              </IonItem>
              <div class="ion-padding" slot="content">
                <Field name="inepCode" rules="required" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="Código INEP" label-placement="stacked" fill="outline" placeholder="Digite o código INEP" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="schoolName" rules="required" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="Nome da Escola" label-placement="stacked" fill="outline" placeholder="Digite o nome da escola" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="corporateName" rules="required" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="Razão Social" label-placement="stacked" fill="outline" placeholder="Digite a razão social" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="cnpj" rules="required|cnpj" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="CNPJ" label-placement="stacked" fill="outline" placeholder="Digite o CNPJ" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="educationNetwork" rules="required" v-slot="{ field, errors }">
                  <IonSelect v-bind="field" label="Rede de Ensino" label-placement="stacked" fill="outline" placeholder="Selecione a rede de ensino">
                    <IonSelectOption value="Pública">Pública</IonSelectOption>
                    <IonSelectOption value="Privada">Privada</IonSelectOption>
                  </IonSelect>
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="phone1" rules="required" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="Telefone 1" label-placement="stacked" fill="outline" placeholder="Digite o telefone 1" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="email" rules="email" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="E-mail" label-placement="stacked" fill="outline" placeholder="Digite o e-mail" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="postalCode" rules="required|postalCode" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="CEP" label-placement="stacked" fill="outline" placeholder="Digite o CEP" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="address" rules="required" v-slot="{ field, errors }">
                  <IonInput v-bind="field" label="Endereço" label-placement="stacked" fill="outline" placeholder="Digite o endereço" />
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>

                <Field name="operatingLocation" rules="required" v-slot="{ field, errors }">
                  <IonSelect v-bind="field" label="Local de Funcionamento" label-placement="stacked" fill="outline" placeholder="Selecione o local de funcionamento">
                    <IonSelectOption value="Própria">Própria</IonSelectOption>
                    <IonSelectOption value="Alugada">Alugada</IonSelectOption>
                  </IonSelect>
                  <span class="error-message">{{ errors[0] }}</span>
                </Field>
              </div>
            </IonAccordion>

            <IonAccordion value="equipments">
              <IonItem slot="header" color="light">
                <IonLabel>Equipamentos</IonLabel>
              </IonItem>
            </IonAccordion>
            <div class="ion-padding" slot="content">
            </div>

            <IonAccordion value="humanResources">
              <IonItem slot="header" color="light">
                <IonLabel>Recursos Humanos</IonLabel>
              </IonItem>
            </IonAccordion>
            <div class="ion-padding" slot="content">
            </div>

            <IonAccordion value="teachingAndPedagogicalPractices">
              <IonItem slot="header" color="light">
                <IonLabel>Ensino e Práticas Pedagógicas</IonLabel>
              </IonItem>
            </IonAccordion>
            <div class="ion-padding" slot="content">
            </div>

          </IonAccordionGroup>
        

      </ion-segment-content>
    </ion-segment-view>

    <IonButton type="submit" expand="block" color="primary">Salvar</IonButton>
  </Form>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9em;
}

.style-purple-lane {
  background: rgba(var(--ion-color-secondary-rgb), 0.15);
  color: var(--ion-color-secondary);
  padding: 2px 2px 2px 2px;
  margin: 8px 2px 8px 2px;
}

ion-segment-content#general ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}

ion-segment-content#complementary ion-input, ion-select {
  margin: 10px 0px 12px 0px;
  color: var(--ion-color-secondary);
}

</style>
