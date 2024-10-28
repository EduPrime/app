<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'
import { IonButton, IonCardSubtitle, IonCardTitle, IonIcon, IonText } from '@ionic/vue'
import { callOutline, globeOutline, logoFacebook, logoInstagram, logoWhatsapp, mailOutline } from 'ionicons/icons'

import { onMounted, ref } from 'vue'

const pageWidth = ref()

onMounted(() => {
    pageWidth.value = catchPageWidth()
    // window.addEventListener('resize', () => {
    //     pageWidth.value = catchPageWidth()
    // })
})
</script>

<template>
    <div :class="pageWidth?.pageWidth < 992 ? 'ion-padding' : ''"
        style="background-color: var(--ion-color-secondary); padding-bottom: 8rem;">
        <div style="max-width: 992px;" class="ion-padding mx-auto">
            <div class="ion-padding-top ion-padding-bottom" style="display: flex;">
                <img src="../assets/images/city_logo.png" width="30%" class="ion-padding"
                    style="background-color: white ; border-radius: 100%; max-width: 120px;" alt="">
                <div style="margin-left: auto; margin-top: auto; margin-bottom: auto;">
                    <IonButton color="light">
                        <IonIcon :icon="logoInstagram" />
                    </IonButton>
                    <IonButton color="light">
                        <IonIcon :icon="logoFacebook" />
                    </IonButton>
                    <IonButton color="light">
                        <IonIcon :icon="globeOutline" />
                    </IonButton>
                </div>
            </div>
            <IonCardSubtitle style=" color: white" class="ion-padding-top">
                <IonText color="lightaccent">
                    Secretaria Municipal de Educação
                </IonText>
            </IonCardSubtitle>
            <IonCardTitle style=" color: white" class="ion-padding-top ion-padding-bottom">
                <IonText color="lightaccent">
                    Araripina - PE
                </IonText>
            </IonCardTitle>
            <hr style="background-color: var(--ion-color-lightaccent);">
            <IonCardTitle style=" color: white" class="ion-padding-top">
                <IonText color="lightaccent">
                    Entre em contato com um toque!
                </IonText>
            </IonCardTitle>
            <div class="ion-padding-top">
                <IonButton href="tel:+550000000000" color="light" size="large" class="ion-padding-end">
                    <IonIcon :icon="callOutline" />
                </IonButton>
                <IonButton target="_blank" href="https://wa.me/558791189300" color="light" size="large"
                    class="ion-padding-end">
                    <IonIcon :icon="logoWhatsapp" />
                </IonButton>
                <IonButton href="mailto:fale@softagon.com.br" color="light" size="large" class="ion-padding-end">
                    <IonIcon :icon="mailOutline" />
                </IonButton>
            </div>
        </div>
    </div>
</template>
