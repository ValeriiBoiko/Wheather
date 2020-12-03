import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ColorScheme, GeoSource, Language, Unit } from '../constants';
import { connect } from 'react-redux';
import WeatherDisplay from '../components/WeatherDisplay';
import DetailWeatherInfo from '../components/DetailWeatherInfo';
import { common } from '../styles/common';
import ScreenWrapper from '../components/ScreenWrapper';
import { setLocation, setScreenAction, setWeather } from '../action';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function DailyForecast(props) {
  const styles = getStyles(props);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    props.setScreen();
    if (!props.location.latitude || !props.location.latitude) {
      props.setLocation(props.geoSource);
    }
  }, [])

  useEffect(() => {
    if (props.location.latitude && props.location.latitude) {
      props.setWeather(props.location, props.unitSystem, props.lang)
    }
  }, [props.location])

  return (
    <ScreenWrapper scrollable={false}>
      <View style={common.flex}>
        <View style={[
          styles.weatherDisplayContainer,
          {
            paddingTop: insets.top ? insets.top : 10,
            flex: 1.
          }
        ]}>
          <WeatherDisplay />
        </View>
        <DetailWeatherInfo />
      </View>
    </ScreenWrapper>
  );
}

const getStyles = props => (
  StyleSheet.create({
    weatherDisplayContainer: {
      backgroundColor: props.theme.backgroundColor,
      overflow: 'hidden',
    },
  })
);

const mapStateToProps = state => ({
  theme: state.displayTheme,
  colorScheme: state.colorScheme,
  unitSystem: state.unitSystem,
  lang: state.lang,
  location: state.location,
  geoSource: state.locationSource,
});

const mapDispatchToProps = (dispatch) => ({
  setWeather: (location, unit, lang) => dispatch(setWeather(location, unit, lang)),
  setLocation: (source) => dispatch(setLocation(source)),
  setScreen: () => dispatch(setScreenAction('screen.DailyForecast')),
});

DailyForecast.propTypes = {
  lang: PropTypes.oneOf([Language.EN, Language.UA]).isRequired,
  unitSystem: PropTypes.oneOf([Unit.IMPERIAL, Unit.METRIC]).isRequired,
  geoSource: PropTypes.oneOf(Object.values(GeoSource)).isRequired,
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT]).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
  setWeather: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(DailyForecast);
