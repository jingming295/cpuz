import { Context, Schema } from 'koishi'
import { HandleData } from '../HandleData'

export const name = 'cpuz'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('cpu', '查询cpu和内存信息')
  ctx.on('message', async (session) => {
    if (session.content === 'cpu') {
      const handleData = new HandleData();
      const cpuInfo = await handleData.handleCPUData();
      const memInfo = await handleData.handleMemData();

      let loadInfo = '';
      for (let i = 0; i < cpuInfo.load.length; i++) {
          loadInfo += `CPU${i + 1}: ${cpuInfo.load[i].toFixed(2)}%\n`;
      }

      const msg = `<>
      <parent>
      CPU<child/>
      制造商: ${cpuInfo.manufacturer}<child/>
      处理器名称: ${cpuInfo.model}<child/>
      核心数: ${cpuInfo.cores}<child/>
      线程数: ${cpuInfo.threads}<child/>
      频率: ${cpuInfo.speed} GHZ<child/>
      温度: ${cpuInfo.temp} 摄氏度<child/>
      ${loadInfo}<child/>
      正常运行时间: ${cpuInfo.uptime.days}天 ${cpuInfo.uptime.hours}小时 ${cpuInfo.uptime.minutes}分钟<child/>
      </parent>
      <parent>
      内存<child/>
      制造商: ${memInfo.manufacturer}<child/>
      DDR: ${memInfo.type}<child/>
      内存大小: ${memInfo.total} GB<child/>
      使用中: ${memInfo.used} GB<child/>
      可用: ${memInfo.free} GB<child/>
      swap大小: ${memInfo.swaptotal} GB<child/>
      使用中: ${memInfo.swapused} GB<child/>
      可用: ${memInfo.swapfree} GB<child/>
      </parent>
      </>`;
      session.send(msg);
    }
  })


}
