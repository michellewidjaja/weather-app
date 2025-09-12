import { ISOFormatOptions } from "date-fns";

export interface Position {
  latitude: number;
  longitude: number;
}

export interface WeatherParams extends Position{
  current?: string;
  hourly?: string;
  daily?: string;
  timezone?: string;
  temperature_unit?: string;
  wind_speed_unit?:string;
  precipitation_unit?: string;
  timeformat?: string;
  start_date?: string;
  end_date?: string;
  start_hour?: string;
  end_hour?:string
}

export interface UnitsParams {
  temperature_unit?: string;
  wind_speed_unit?: string;
  precipitation_unit?: string;
}