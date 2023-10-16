/// <reference types="vite/client" />

import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    DDLogin: any
    Message: any
    Modal: any
  }
}
