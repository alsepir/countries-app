import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { ICountryModel } from './store/types'

class ConfigApi {
  private axiosInstance: AxiosInstance

  private static REGION = 'region'

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Cache-Control': 'no-cache',
      },
      timeout: 5 * 1000,
    })
  }

  _get = async (url: string, axiosConfig?: AxiosRequestConfig) => {
    const res = await this.axiosInstance.get(url, axiosConfig)
    return res
  }

  regionRequest = async (region: string): Promise<ICountryModel[]> => {
    const res: AxiosResponse<null> = await this._get(`${ConfigApi.REGION}/${region}`)
    return res.data || []
  }
}

export const api = new ConfigApi('https://restcountries.com/v3.1/')
