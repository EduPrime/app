export interface FileAttachment {
  id?: string
  file_name: string
  mime_type: string
  size: number
  is_current_version?: boolean
  file_hash?: string
  upload_date?: string
  storage_path: string
  version?: number
  signature_status: string
  certificateid?: string
  compression_applied?: boolean
  metadata?: Record<string, any>
  is_deleted?: boolean
  userid?: string
}

export const files: FileAttachment[] = [
  {
    id: 'uuid-1',
    file_name: 'Escola Mercúrio',
    mime_type: '',
    size: 5000,
    is_current_version: true,
    file_hash: 'hash-1',
    upload_date: '',
    storage_path: '',
    version: 1,
    signature_status: 'Unsigned',
    certificateid: 'cert-uuid-1',
    compression_applied: false,
    is_deleted: false,
    userid: 'user-uuid-1',

  },
  {
    id: 'uuid-2',
    file_name: 'File Document name',
    mime_type: 'application/pdf',
    size: 5000,
    is_current_version: true,
    file_hash: 'hash-2',
    upload_date: '',
    storage_path: '',
    version: 1,
    signature_status: 'Unsigned',
    certificateid: 'cert-uuid-2',
    compression_applied: false,
    is_deleted: false,
    userid: 'user-uuid-2',

  },
  {
    id: 'uuid-3',
    file_name: 'Excel report',
    mime_type: 'application/vnd.ms-excel',
    size: 5000,
    is_current_version: true,
    file_hash: 'hash-3',
    upload_date: '',
    storage_path: '',
    version: 1,
    signature_status: 'Unsigned',
    certificateid: 'cert-uuid-3',
    compression_applied: false,
    is_deleted: false,
    userid: 'user-uuid-3',

  },
  {
    id: 'uuid-4',
    file_name: 'Escola Mercúrio',
    mime_type: '',
    size: 5000,
    is_current_version: true,
    file_hash: 'hash-4',
    upload_date: '',
    storage_path: '',
    version: 1,
    signature_status: 'Unsigned',
    certificateid: 'cert-uuid-4',
    compression_applied: false,
    is_deleted: false,
    userid: 'user-uuid-4',

  },
]
