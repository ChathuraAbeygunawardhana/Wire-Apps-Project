import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';

export const showAlert = (message, type) => {
  Dialog.show({
    type: ALERT_TYPE[type],
    title: type === 'SUCCESS' ? 'Success' : 'Warning',
    textBody: message,
    button: 'OK',
    titleStyle: { color: 'black' },
    textBodyStyle: { color: 'black' },
    buttonStyle: { backgroundColor: 'black' },
    buttonTextStyle: { color: 'white' },
  });
};
