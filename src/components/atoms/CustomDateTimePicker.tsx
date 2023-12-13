import { CustomRow, CustomModal, CustomButton, CustomInput } from '@components/atoms';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, Spacing } from '@styles/index';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ImageStyle, Platform, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

const CustomDateTime = React.forwardRef(
  ({ style, placeholder, onChangeDate, value, disabled, maximumDate, minimumDate, mode, minuteInterval }: Props) => {
    const [dateString, setDateString] = useState('');
    const [dateStringIOS, setDateStringIOS] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (value) {
        if (mode === 'time' && typeof value === 'string') {
          setDateString(value);
          setDateStringIOS(value);
          const dateTemp = new Date();
          const s = value.split(':');
          dateTemp.setHours(parseInt(s[0], 10), parseInt(s[1], 10));
          setDate(dateTemp);
        } else if (mode === 'date' && value instanceof Date) {
          const ds = moment(value).format('l');
          setDateString(ds);
          setDateStringIOS(ds);
          setDate(value);
        }
      } else {
        setDateString('');
        setDateStringIOS('');
        setDate(new Date());
      }
    }, [mode, value]);

    const onChangeAndroid = (event: any, selectedDate: any) => {
      setShow(false);
      if (selectedDate) {
        setDate(selectedDate);
        const ds = getDateString(selectedDate);
        setDateString(ds);
        onChangeDate && onChangeDate(mode === 'time' ? ds : selectedDate);
      }
    };

    const onChangeIOS = (event: any, selectedDate: any) => {
      if (selectedDate) {
        setDate(selectedDate);
        const ds = getDateString(selectedDate);
        setDateStringIOS(ds);
      }
    };

    const confirmIOS = () => {
      setShow(false);
      setDateString(dateStringIOS);
      onChangeDate && onChangeDate(mode === 'time' ? dateStringIOS : date);
    };

    const getDateString = (selectedDate: any) => {
      let ds = '';
      if (mode === 'time') {
        let hour = selectedDate.getHours();
        hour = hour < 10 ? `0${hour}` : hour;
        let minutes = selectedDate.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        ds = `${hour}:${minutes}`;
      } else {
        ds = moment(selectedDate).format('l');
      }
      return ds;
    };

    return (
      <View style={[mStyle.container, style]}>
        <CustomInput
          disabled={true}
          value={dateString}
          onContainerPress={!disabled ? () => setShow(true) : null}
          placeholder={placeholder}
          rightIcon={mode === 'date' ? 'event' : 'schedule'}
        />
        {Platform.OS === 'ios' ? (
          <CustomModal visibile={show} onBackdropPress={() => setShow(false)}>
            <View style={mStyle.baseContentModal}>
              <CustomRow marginTop style={{ flex: 0, justifyContent: 'flex-end' }}>
                <CustomButton trasparent bold color={'primary'} title={'Fatto'} onClick={confirmIOS} />
              </CustomRow>
              <DateTimePicker
                textColor={Colors.BLACK}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                display={mode === 'time' ? 'spinner' : 'spinner'}
                locale={'it-IT'}
                minuteInterval={minuteInterval || 1}
                onChange={onChangeIOS}
              />
            </View>
          </CustomModal>
        ) : (
          show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              is24Hour={true}
              minuteInterval={minuteInterval || 1}
              display={mode === 'time' ? 'spinner' : 'default'}
              onChange={onChangeAndroid}
            />
          )
        )}
      </View>
    );
  },
);

const mStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseContentModal: {
    backgroundColor: Colors.GRAY_LIGHT,
    width: '100%',
    height: 'auto',
    paddingHorizontal: Spacing.SCALE_12,
  },
});

type Props = {
  onChangeDate?: ((dateTime: any) => void) | undefined;
  value?: string | Date;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  style?: ViewStyle | TextStyle | ImageStyle;
  placeholder?: string;
  mode?: 'date' | 'time';
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
};

export { CustomDateTime };
