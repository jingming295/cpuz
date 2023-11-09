import { Context } from 'koishi'
import { HandleData } from '../HandleData'

export const name = 'cpuz'

export function apply(ctx: Context, config) {
  // console.log(await handleData.getData(config.coreLoad))
  ctx.command('cpu', '查询cpu和内存信息').action(
    async () => {
      const handleData = new HandleData()
      return  handleData.getData(config.coreLoad)
    }
  )


}
