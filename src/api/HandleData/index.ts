import { CpuStatus, MemoryStatus } from '../GetData'

export class HandleData {

    async handleCPUData(){
        const cpuStatus = new CpuStatus();

        const temp = await cpuStatus.getCPUTemp()
        const currentload = await cpuStatus.getCpuLoad();
        const coreCurrentload = await cpuStatus.getCpuCoreLoad()
        const uptime = await cpuStatus.getSystemUptime();
        const cpudata = await cpuStatus.getCPUDetails();

        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);

        if(cpudata.processors >0){
            cpudata.brand = `${cpudata.processors}X ${cpudata.brand}`
        }

        const uptimeInfo:UptimeInfo = {
            days: days,
            hours: hours,
            minutes: minutes,
        }

        const cpuInfo:CPUInfo = {
            manufacturer: cpudata.manufacturer,
            model:cpudata.brand,
            cores:cpudata.physicalCores,
            threads:cpudata.cores,
            speed:cpudata.speed,
            temp: temp,
            cpuload: currentload,
            coreLoad:coreCurrentload,
            uptime: uptimeInfo
        }
        return await cpuInfo
    }

    async handleMemData(){
        let manufacturers:string
        const memoryStatus = new MemoryStatus();
        const data = await memoryStatus.getMemoryDetails();
        const layout = await memoryStatus.getMemoryLayout();
        const totalRamGB = parseFloat((data.total / (1024 * 1024 * 1024)).toFixed(2));
        const usedRamGB = parseFloat((data.active / (1024 * 1024 * 1024)).toFixed(2));
        const freeRamGB = parseFloat((data.available / (1024 * 1024 * 1024)).toFixed(2));
        const swaptotal = parseFloat((data.swaptotal / (1024 * 1024 * 1024)).toFixed(2));
        const swapused = parseFloat((data.swapused / (1024 * 1024 * 1024)).toFixed(2));
        const swapfree = parseFloat((data.swapfree / (1024 * 1024 * 1024)).toFixed(2));
        const ddr = layout[0].type;
        const clockspeed = layout[0].clockSpeed;
        
        if(layout.length>1){
            manufacturers = layout.map(module => module.manufacturer).join(' + ');
        } else {
            manufacturers = layout[0].manufacturer
        }
        
        const memInfo:MemInfo = {
            manufacturer:manufacturers || '无法获取',
            type:ddr || '无法获取',
            clockspeed:clockspeed,
            total:totalRamGB,
            used:usedRamGB,
            free:freeRamGB,
            swaptotal:swaptotal,
            swapused:swapused,
            swapfree:swapfree,
        }
        return memInfo;
    }
    
    async getData(coreLoad:boolean){
        const cpuInfo = await this.handleCPUData();
        const memInfo = await this.handleMemData();
        let loadInfo = '';
        if (coreLoad) {
            for (let i = 0; i < cpuInfo.coreLoad.length; i++) {
                const cpuNumber = `CPU ${i + 1}`.padEnd(6, ' ');
                const cpuLoadString = `${cpuInfo.coreLoad[i].toFixed(2)}%`.padStart(7, ' ');
                loadInfo += `${cpuNumber}: ${cpuLoadString}\n`;
                if ((i + 1) % 5 === 0) {
                    loadInfo += '\n';
                }
            }
        }
        const msg = `
        <>
        <parent>
        处理器详情:<child/>
        制造商: ${cpuInfo.manufacturer}<child/>
        处理器名称: ${cpuInfo.model}<child/>
        核心数: ${cpuInfo.cores}<child/>
        线程数: ${cpuInfo.threads}<child/>
        频率: ${cpuInfo.speed} GHZ<child/>
        温度: ${cpuInfo.temp} ℃<child/>
        正常运行时间: ${cpuInfo.uptime.days}天 ${cpuInfo.uptime.hours}小时 ${cpuInfo.uptime.minutes}分钟<child/>
        当前处理器负载: ${cpuInfo.cpuload.toFixed(2)}%<child/>
        </parent>
        <parent>
        ${loadInfo}<child/>
        </parent>
        <parent>
        内存详情:<child/>
        制造商: ${memInfo.manufacturer}<child/>
        DDR: ${memInfo.type}<child/>
        时钟速度: ${memInfo.clockspeed || '无法获取'}<child/>
        内存大小: ${memInfo.total} GB<child/>
        使用中: ${memInfo.used} GB (${((memInfo.used/memInfo.total)*100).toFixed(2)}%)<child/>
        可用: ${memInfo.free} GB (${((memInfo.free/memInfo.total)*100).toFixed(2)}%)<child/>
        swap大小: ${memInfo.swaptotal} GB<child/>
        使用中: ${memInfo.swapused} GB (${((memInfo.swapused/memInfo.swaptotal)*100).toFixed(2)}%)<child/>
        可用: ${memInfo.swapfree} GB (${((memInfo.swapfree/memInfo.swaptotal)*100).toFixed(2)}%)<child/>
        </parent>
        </>
        `;
        return msg
    }

}