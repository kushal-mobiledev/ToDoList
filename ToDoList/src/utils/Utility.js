import {Dimensions, Platform, PixelRatio} from 'react-native';
import moment from 'moment';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const actuatedNormalize = size => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const numberFormat = value => {
  let number = parseInt(value);

  return new Intl.NumberFormat(getLocale()).format(number);
};

export const getCurrentTime = (isFormatRequired = false) => {
  if (isFormatRequired) {
    return moment().format('DD-MM-YY HH:mm:ss:SSS');
  } else {
    return moment().valueOf();
  }
};
