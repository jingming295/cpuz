import { Schema } from 'koishi'
export interface Config { }
export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      coreLoad: Schema.boolean().default(true).description('是否显示cpu核心加载详情'),
    }).description('游览器页面相关设置'),
  ]);