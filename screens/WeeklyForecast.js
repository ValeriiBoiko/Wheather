import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Color, ColorScheme } from '../constants';
import { connect } from 'react-redux';
import { common } from '../styles/common';
import WeatherDisplay from '../components/WeatherDisplay';
import DailyShortForecast from '../components/DailyLineForecast';
import ScreenWrapper from '../components/ScreenWrapper';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function WeeklyForecast({ weather, theme, colorScheme, ...props }) {
  const styles = useMemo(() => getStyles(colorScheme), [colorScheme]);
  const insets = useSafeAreaInsets();
  const dailyForecast = Object.values(weather).map(
    (item, index, values) => {
      const isLastDay = index === values.length - 1;
      const style = isLastDay ? styles.lastDayLine : styles.dayLine;
      return <DailyShortForecast key={item.day} data={item} style={style} />;
    },
  );

  return (
    <ScreenWrapper scrollable={false}>
      <View style={common.flex}>
        <View
          style={[
            {
              backgroundColor: theme.backgroundColor,
              paddingTop: insets.top ? insets.top : 10,
              flex: 1,
            }
          ]}>
          <WeatherDisplay compact={true} />
        </View>
        {dailyForecast}
      </View>
    </ScreenWrapper>
  );
}

const getStyles = colorScheme =>
  StyleSheet.create({
    dayLine: {
      borderBottomColor: Color[colorScheme].SEPARATOR,
      borderBottomWidth: 1,
      marginHorizontal: '5%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    lastDayLine: {
      marginHorizontal: '5%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

const mapStateToProps = state => {
  return {
    theme: state.displayTheme,
    weather: state.weather.week,
    colorScheme: state.colorScheme,
  };
};

WeeklyForecast.propTypes = {
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string
  }).isRequired,
  weather: PropTypes.object.isRequired,
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT]),
}

export default connect(mapStateToProps)(WeeklyForecast);
