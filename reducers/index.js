import { Action, IconsMap, Images, GeoSource, ColorScheme, Unit, Language, LightTheme } from '../constants';

const initialState = {
  city: 'n/a',
  location: {
    latitude: 0,
    longitude: 0,
  },
  useStaticLocation: false,
  locationSource: GeoSource.GPS,
  unitSystem: Unit.IMPERIAL,
  weather: {
    sunrise: 0,
    sunset: 0,
    city: 'n/a',
    today: {
      dt: new Date(),
      clouds: 'n/a',
      temp: 'n/a',
      feelsLike: 'n/a',
      humidity: 'n/a',
      description: 'n/a',
      title: 'cloudy',
      wind: 'n/a',
      icon: '01d',
    },
    week: {},
  },
  currentScreen: null,
  displayTheme: {
    backgroundColor: LightTheme.clearDay,
    backgroundImage: Images.CLOUDY_DAY,
  },
  lang: Language.EN,
  colorScheme: ColorScheme.LIGHT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Action.SET_WEATHER:
      return {
        ...state,
        weather: action.payload,
        displayTheme: {
          backgroundColor: IconsMap[action.payload.today.icon].color,
          backgroundImage: IconsMap[action.payload.today.icon].image,
        },
      };
    case Action.SET_SCREEN:
      return {
        ...state,
        currentScreen: action.payload,
      };
    case Action.SET_UNIT_SYSTEM:
      return {
        ...state,
        unitSystem: action.payload,
      };
    case Action.SET_LOCATION:
      return {
        ...state,
        ...action.payload,
      };
    case Action.SET_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    case Action.SET_COLOR_SCHEME:
      return {
        ...state,
        colorScheme: action.payload,
      };
  }

  return state;
};
