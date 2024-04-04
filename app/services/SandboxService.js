import { AppState } from "../AppState.js"
import { Apod } from "../models/Apod.js";
import { api } from "./AxiosService.js"




class SandboxService {
  async deleteApod(apodId) {
    const response = await api.delete(`api/apods/${apodId}`)
    console.log('💣🌌', response.data);
    const indexToRemove = AppState.myApods.findIndex(apod => apod.id == apodId)
    AppState.myApods.splice(indexToRemove, 1)
  }
  async getMyApods() {
    const response = await api.get('api/apods')
    console.log('🌌🕴️', response.data);
    const myApods = response.data.map(apod => new Apod(apod))
    AppState.myApods = myApods
    console.log('🗃️🌌');
    console.log(AppState.myApods);
  }
  async saveApod() {
    const response = await api.post('api/apods', AppState.activeApod)
    console.log('💾🌌', response.data);
    const apod = new Apod(response.data)
    AppState.myApods.push(apod)
  }
  setActiveApod(apodId) {
    const selectedApod = AppState.myApods.find(apod => apod.id == apodId)
    AppState.activeApod = selectedApod
  }

}

export const sandboxService = new SandboxService()