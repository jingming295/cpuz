import { Schema } from 'koishi'
export * from './api/HandleMsg'

export const name = 'cpuz'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})
