import si from 'systeminformation';

export class CpuStatus {

    async getCPUTemp(){
        try {
            const data = await si.cpuTemperature();
            return data.main;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getCpuCoreLoad() {
        try {
            const data = await si.currentLoad();
            return data.cpus.map(core => core.load);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getSystemUptime() {
        try {
            const data = await si.time();
            return data.uptime;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getCPUDetails() {
        try {
            const data = await si.cpu();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getCpuLoad() {
        const load = await si.currentLoad();
        return load.currentLoad
    }
    
}

export class MemoryStatus {
    async getMemoryDetails() {
        try {
            const data = await si.mem();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getMemoryLayout() {
        try {
            const data = await si.memLayout();
            const filteredData = data.filter(module => module.size > 1);
            return filteredData;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
}