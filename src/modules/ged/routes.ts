// src/modules/ged/routes.ts
import { cloudUpload, cloudUploadOutline } from 'ionicons/icons'
import UploadFiles from './views/UploadFiles.vue'

const routes = [
  {
    path: '/ged/upload-file',
    name: 'GED Upload File',
    component: UploadFiles,
    meta: {
      moduleName: 'GED',
      moduleIcon: cloudUploadOutline,
      icon: cloudUpload,
      name: 'Upload Files',
      order: 4,
    },
  },
]

export default routes
