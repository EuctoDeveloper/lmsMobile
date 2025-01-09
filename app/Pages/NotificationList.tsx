import Header from '@/components/Input/Header';
import useBackHandler from '@/hooks/useBackHandler';
import { clearNotification, dirtNotification, getNotifications } from '@/store/action/common/courseAction';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

const NotificationItem = (props: any) => {
  const clickNotification = (notification: any) => {
    props.clearNotification_(notification.notificationId);
    router.push({pathname: notification.landing, params: {...(JSON.parse(notification.landingData)), disableForcePush: 'false'}});
  }
  useBackHandler();
  return (
    <TouchableOpacity style={styles.notificationItem} onPress={()=>clickNotification(props.notification)}>
      <Image source={{uri: props.notification.image}} style={styles.profileImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{props.notification.title}</Text>
        <Text style={styles.description}>{props.notification.description}</Text>
        <Text style={styles.timestamp}>
          {new Date(props.notification.createdAt).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',})
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationList = ({ notifications }: any) => {
  return (
    <View style={styles.notificationList}>
      {notifications.map((notification: any, index: any) => (
        <NotificationItem
          key={index}
          notification={notification}
          clearNotification_={clearNotification}
        />
      ))}
    </View>
  );
};

const MyComponent = (props: any) => {
  const [notifications, setNotifications] = React.useState([]);
  useEffect(() => {
    props.getNotifications_();
  }
  , []);
  useFocusEffect(
    React.useCallback(() => {
      const fetchNotifications = async () => {
        setNotifications(props.notifications);
        props.dirtNotification_();
      };

      fetchNotifications();
      return () => {
      };
    }, [props.notifications])
  );

  return (
    <SafeAreaView style={{flex: 1}}>
    <Header title={"Notifications"} page={"/(tabs)/"} hideBellIcon={true} />
    <View style={styles.container}>
      {/* <Text style={styles.header}>Today, May 21</Text> */}
      
      {notifications.length === 0 && 
          <View style={{width: "100%", height: "100%", backgroundColor: "white", alignItems: 'center'}}>
           <Image source={require('../../assets/images/emptyNotification.png')} style={{width: 250, height: 200, marginTop: 100}} />
           <Text style={{fontSize: 20, marginTop: 20, fontWeight: 600}}>No Notifications Yet</Text>
            <TouchableOpacity style={styles.nextButton} onPress={()=>props.getNotifications_}>
              <Text style={styles.nextButtonText}>Refresh</Text>
            </TouchableOpacity>
        </View>
      }
      <NotificationList notifications={notifications} clearNotification_={props.clearNotification_} />
    </View>
    </SafeAreaView>
  );
};


const mapStateToProps = (state: any) => ({
  notifications: state.notifications?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  getNotifications_ : () => dispatch(getNotifications()),
  dirtNotification_: () => dispatch(dirtNotification()),
  clearNotification_: (id: any) => dispatch(clearNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);


const styles = StyleSheet.create({
    notificationList: {
        flex: 1,
      },
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    header: {
      fontSize: 18,
      fontWeight: 'normal',
      color: 'gray',
      marginBottom: 16,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius:   
   3.84,
      elevation: 5,
      marginBottom: 16,
      padding: 12,   
  
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    notificationContent: {
      flex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      marginBottom: 4,
    },
    timestamp: {
      fontSize: 14,
      color: 'gray',
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 4,
      padding: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
    },
    // Styles for the footer (adjust as needed)
    footerNotification: {
      backgroundColor: 'lightblue',
    },
    acceptButton: {
      backgroundColor: 'green',
    },
    ignoreButton: {
      backgroundColor: 'red',
    },
    description: {
      fontSize: 10,
      color: '#676767',
    },
    nextButton: {
      marginTop: 20,
      backgroundColor: '#ff7f45', // Orange color for the Next button
      padding: 10,
      paddingHorizontal: 50,
      borderRadius: 30,
      alignItems: 'center',
    },
    nextButtonText: {
      fontSize: 18,
      color: '#FFF', // White text inside the Next button
      fontWeight: 'bold',
    },
  });
  