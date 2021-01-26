export interface GridPoints {
    id: string;
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: {
        cwa: string;
        forecastOffice: string;
        gridId: string;
        gridX: number;
        gridY: number;
        forecast: string;
        forecastHourly: string;
        forecastGridData: string;
        observationStations: string;
        relativeLocation: {
            type: string;
            geometry: {
                type: string;
                coordinates: number[];
            };
            properties: {
                city: string;
                state: string;
                distance: {
                    value: number;
                    unitCode: string;
                };
                bearing: {
                    value: number;
                    unitCode: string;
                };
            };
        };
        forecastZone: 'string';
        county: 'string';
        fireWeatherZone: 'string';
        timeZone: 'string';
        radarStation: 'string';
    };
}
