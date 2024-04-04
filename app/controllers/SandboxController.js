import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class SandboxController {
  constructor() {
    console.log('⏳🎮');
    AppState.on('account', this.getMyApods)
    AppState.on('myApods', this.drawMyApods)
  }


  async saveApod() {
    try {
      await sandboxService.saveApod()
      Pop.toast("APOD saved", 'success')
    } catch (error) {
      Pop.toast("Could not save APOD", 'error')
      console.error(error)
    }
  }

  async getMyApods() {
    try {
      await sandboxService.getMyApods()
    } catch (error) {
      Pop.toast("Could not get your APODs", 'error')
      console.error(error)
    }
  }
  async deleteApod(apodId) {
    try {
      const result = await Pop.confirm("are you sure you want to do this?", "This is a very cool picture IMO and is worth the save", "Yeah Send it to a black hole")
      if (result == false) return

      await sandboxService.deleteApod(apodId)
    } catch (error) {
      Pop.toast("Could Delete the APOD", 'error')
      console.error(error)
    }
  }

  setActiveApod(apodId) {
    sandboxService.setActiveApod(apodId)
  }

  drawMyApods() {
    console.log('✏️ drawing apods');
    const myApods = AppState.myApods
    let myApodList = ''
    myApods.forEach(apod => myApodList += apod.MyApodListTemplate)
    setHTML('my-apods', myApodList)
  }

}