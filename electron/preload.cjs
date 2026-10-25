const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('sloth', Object.freeze({
  status:()=>ipcRenderer.invoke('sloth:status'),
  chooseSource:()=>ipcRenderer.invoke('sloth:choose-source'),
  chooseDestination:()=>ipcRenderer.invoke('sloth:choose-destination'),
  scan:(folder)=>ipcRenderer.invoke('sloth:scan',folder),
  analyze:(ids,model)=>ipcRenderer.invoke('sloth:analyze',ids,model),
  exportPack:(payload)=>ipcRenderer.invoke('sloth:export',payload),
  load:()=>ipcRenderer.invoke('sloth:load'),
  save:(state)=>ipcRenderer.invoke('sloth:save',state),
  onProgress:(fn)=>{const listener=(_e,v)=>fn(v);ipcRenderer.on('sloth:progress',listener);return()=>ipcRenderer.removeListener('sloth:progress',listener)}
}));