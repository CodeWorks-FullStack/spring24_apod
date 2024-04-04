import { AppState } from "../AppState.js";
import { baseURL } from "../env.js"
import { Apod } from "../models/Apod.js";

const apiKey = '2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1'

// @ts-ignore
const nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/',
  timeout: 4000,
  params: { // this adds the api_key as a parameter to all of our requests
    api_key: apiKey
  }
})



class NASAService {
  async getApod() {
    // const response = await nasaApi.get(`apod?api_key=${apiKey}`)
    const response = await nasaApi.get('apod')
    console.log('🚀🛰️', response.data);
    const apod = new Apod(response.data) // converting one thing, no need for mapping
    AppState.activeApod = apod
    console.log('🗃️', AppState.activeApod);
  }

  async getApodByDate(date) {
    const response = await nasaApi.get(`apod?date=${date}`)
    console.log('📆🚀🛰️', response.data);
    const apod = new Apod(response.data)
    AppState.activeApod = apod
  }

}

export const nasaService = new NASAService()