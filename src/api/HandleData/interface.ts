interface UptimeInfo {
    days: number;
    hours: number;
    minutes: number;
}

interface CPUInfo {
    manufacturer:string
    model:string
    cores:number
    threads:number
    speed:number
    temp:number
    cpuload:number
    coreLoad:number[]
    uptime:UptimeInfo
}

interface MemInfo {
    manufacturer:string
    type:string
    clockspeed:number
    total:number
    used:number
    free:number
    swaptotal:number
    swapused:number
    swapfree:number


}