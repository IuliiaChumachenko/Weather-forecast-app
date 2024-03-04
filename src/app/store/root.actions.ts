const StateLabel = "[Root]";

export namespace RootActions {

  export class LoadLocationAndWeather {
    static readonly type: string = `${StateLabel} load location and weather`;
  }

  export class LoadPlaceByGeodata {
    static readonly type: string = `${StateLabel} load place by geodata`;

    constructor(
      public readonly lat: number,
      public readonly lon: number
    ) {
    }
  }

  export class LoadWeather {
    static readonly type: string = `${StateLabel} load weather`;

    constructor(
      public readonly params: any
    ) {
    }
  }

  export class SearchLocation {
    static readonly type: string = `${StateLabel} search location`;

    constructor(
      public readonly searchStr: string
    ) {
    }
  }

  export class UpdateLocations {
    static readonly type: string = `${StateLabel} update locations`;

    constructor(
      public readonly location: string
    ) {
    }
  }
}
