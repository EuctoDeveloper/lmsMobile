import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (action="EXIT") => {
  useFocusEffect(useCallback(() => {
    const backAction = () => {
        switch(action) {
            case "EXIT":
                BackHandler.exitApp(); 
                return true;
            default:
                return false;
        }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [action]));
};

export default useBackHandler;