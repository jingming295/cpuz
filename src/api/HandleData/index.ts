import { CpuStatus, MemoryStatus } from '../GetData'

export class HandleData {

    async handleCPUData(){
        const cpuStatus = new CpuStatus();

        const temp = await cpuStatus.getCPUTemp()
        const currentload = await cpuStatus.getCpuUsage();
        const uptime = await cpuStatus.getSystemUptime();
        const cpudata = await cpuStatus.getCPUDetails();

        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);

        const uptimeInfo:UptimeInfo = {
            days: days,
            hours: hours,
            minutes: minutes,
        }

        const cpuInfo:CPUInfo = {
            manufacturer: cpudata['manufacturer'],
            model:cpudata['brand'],
            cores:cpudata['physicalCores'],
            threads:cpudata['cores'],
            speed:cpudata['speed'],
            temp: temp,
            load: currentload,
            uptime: uptimeInfo
        }
        return await cpuInfo
    }

    async handleMemData(){
        const memoryStatus = new MemoryStatus();
        const data = await memoryStatus.getMemoryDetails();
        const layout = await memoryStatus.getMemoryLayout();
        const totalRamGB = parseFloat((data.total / (1024 * 1024 * 1024)).toFixed(2));
        const usedRamGB = parseFloat((data.used / (1024 * 1024 * 1024)).toFixed(2));
        const freeRamGB = parseFloat((data.free / (1024 * 1024 * 1024)).toFixed(2));
        const swaptotal = parseFloat((data.swaptotal / (1024 * 1024 * 1024)).toFixed(2));
        const swapused = parseFloat((data.swapused / (1024 * 1024 * 1024)).toFixed(2));
        const swapfree = parseFloat((data.swapfree / (1024 * 1024 * 1024)).toFixed(2));
        const ddr = layout[0]['type'];
        const clockspeed = layout[0]['clockSpeed'];
        const memInfo:MemInfo = {
            manufacturer:layout[0].manufacturer,
            type:ddr,
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
    

}