import { CellestialDTO } from "./CelestialDTO";

export interface CelestialWeatherDTO {
    visibleCellestials: CellestialDTO[]
    cloudCoverage: number[]
}