import { ToastAndroid } from 'react-native';

import { Snackbar } from 'react-native-paper';



type NotificationType = 'success' | 'info' | 'warning' | 'error';



interface NotificationProps {

    type: NotificationType;

    heading: string;

    content: string;

}
let snackbarRef: any;

export const setSnackbarRef = (ref: any) => {
    snackbarRef = ref;
};

const openNotification = ({ type, heading, content }: NotificationProps) => {
    if (snackbarRef) {
        snackbarRef.show({
            text: `${heading}: ${content}`,
            duration: Snackbar.DURATION_SHORT,
        });
    }
};


// Removed duplicate openNotification function



export default openNotification;
