import { CellestialDTO } from "./CelestialDTO";
import { CloudCoverageEntryDTO } from "./CloudCoverageEntryDTO";

export interface CelestialWeatherDTO {
    visibleCellestials: CellestialDTO[]
    cloudCoverage: CloudCoverageEntryDTO[]
}