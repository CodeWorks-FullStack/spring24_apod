import { AppState } from "../AppState.js";
import { nasaService } from "../services/NASAService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";




export class NASAController {
  constructor() {
    console.log('🚀🎮');
    this.getApod()
    AppState.on('activeApod', this.drawApod)
  }

  async getApod() {
    try {
      await nasaService.getApod()
    } catch (error) {
      Pop.toast("Could not get APOD, failure to launch", 'error')
      console.error(error)
    }
  }

  drawApod() {
    const activeApod = AppState.activeApod
    setHTML('active-apod', activeApod.ActiveApodTemplate)
    document.body.style.backgroundImage = `url(${activeApod.imgUrl})`
  }

  async getApodByDate() {
    try {
      const input = event.target
      console.log('date changed', input);
      const date = input.value
      console.log('📆', date);
      await nasaService.getApodByDate(date)
    } catch (error) {
      Pop.toast("Could not get APOD, try another date", 'error')
      console.error(error)
    }
  }
}