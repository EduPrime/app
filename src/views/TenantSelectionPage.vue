<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Select Tenant</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="project in projects" :key="project.id">
          <ion-label @click="selectProject(project.id)">{{ project.name }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-list v-if="applications.length > 0">
        <ion-item v-for="app in applications" :key="app.id">
          <ion-label @click="selectApplication(app.id)">{{ app.name }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-button v-if="selectedProject && selectedApplication" @click="submitSelection">Submit</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      projects: [],
      applications: [],
      selectedProject: null,
      selectedApplication: null,
    };
  },
  async created() {
    const user = localStorage.getItem('user');
    if (!user.access_token) {
      this.$router.push('/login');
      return;
    }

    try {
      const response = await axios.get('https://eduprime-ikzrub.zitadel.cloud/projects', {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      this.projects = response.data.projects;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async selectProject(projectId) {
      this.selectedProject = projectId;
      const user = localStorage.getItem('user');
      const response = await axios.get(`https://eduprime-ikzrub.zitadel.cloud/projects/${projectId}/applications`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      this.applications = response.data.applications;
    },
    selectApplication(applicationId) {
      this.selectedApplication = applicationId;
    },
    async submitSelection() {
      const token = localStorage.getItem('jwt');
      const response = await axios.post(`https://eduprime-ikzrub.zitadel.cloud/oauth/v2/token`, {
        grant_type: 'authorization_code',
        client_id: 'your-client-id',
        client_secret: 'your-client-secret',
        redirect_uri: 'http://localhost:3000/auth/callback',
        code: this.selectedApplication,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newToken = response.data.access_token;
      localStorage.setItem('jwt', newToken);
      this.$router.push('/home');
    }
  }
};
</script>
