import Header from '../../components/Input/Header';
import { getWebinarDetail } from '../../store/action/common/webinarActions';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { connect } from 'react-redux';
import { Alert } from "react-native";
import ZoomUs from 'react-native-zoom-us';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { postApi } from '../../store/api/api';



const WebinarDetail = (props: any) => {
  const params = useLocalSearchParams();

  const [webinarDetail, setWebinarDetail] = React.useState<any>({});
  const [waitingForHost, setWaitingForHost] = React.useState(false);
  const id = params.id;

  const initializeZoom = async () => {
    console.log("init");
    setWaitingForHost(false);
  
  try {
    let token = await postApi('/stream/webinar/getJwtToken', {
      meetingId: webinarDetail.meetingId,
      role: 0
    });
    console.log(token, token.signature);
    await ZoomUs.initialize(
      {
        jwtToken: token.signature, 
        domain: 'zoom.us',
      },
      {
        disableShowVideoPreviewWhenJoinMeeting: false,
        enableCustomizedMeetingUI: false,  
        
      }, 
    );
    console.log("init completeddfd");

    
    console.log("Attempting to join meeting...");

    const fName = SecureStore.getItem('firstName') || props?.login?.userData?.firstName || props?.otpLogin?.userData?.firstName;
    const lName = SecureStore .getItem('lastName') || props?.login?.userData?.lastName || props?.otpLogin?.userData?.lastName;
    ZoomUs.joinMeeting({
      userName: `${fName} ${lName}`,
      meetingNumber: webinarDetail.meetingId,
      password: webinarDetail.meetingPassword, // if required
      autoConnectAudio: true,
      noAudio: false,
      noVideo: false,
    }).then(() => {
      console.log('Meeting joined successfullyq'); 
    }).catch((error) => {
      // Alert.alert("Too Early", "You can only join the meeting only after Host starts it.");
      // console.error('Failed to join meeting', error);
    });;
    console.log("join meeting completed");
    ZoomUs.onMeetingStatusChange(async (status) => {
      console.log('Meeting Status:', status.event);
      if (status.event === 'MEETING_STATUS_WAITINGFORHOST') {
        console.log("Waiting for host to start the meeting");
        await ZoomUs.leaveMeeting();
        setTimeout(() => {
          if(!waitingForHost) {
            setWaitingForHost(true);
          }
        }, 1000);
        return "Join Later"
        // Show waiting UI
      } else if (status.event === 'MEETING_STATUS_INMEETING') {
        // Show meeting UI
      }
    });

    ;
  } catch (error) {
    console.error("Error initializing or joining Zoom meeting:", error);
    Alert.alert("Too Early", "You can only join the meeting only after Host starts it.");
  }

  }    


  const formatDate = (timestamp:any) => {
    let date = new Date(timestamp);
    let options = { weekday: "long", day: "2-digit", month: "long" };
    return date.toLocaleDateString("en-US", options);
}
  const formatTime = (timeString: any) => {
    if(timeString) {
      let [hours, minutes] = timeString.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
    } else {
      return '';
    }
  }
  const joinMeeting = async () => {
    const currentTime = new Date().getTime();
    const meetingTime = new Date(`${webinarDetail.date}T${webinarDetail.time}`).getTime();
    const timeDifference = meetingTime - currentTime;

    // if (timeDifference <= 5 * 60 * 1000) {
    if (true) {
      initializeZoom();
    } else {
      Alert.alert("Too Early", "You can only join the meeting only after Host starts it.");
    }
  }
  useEffect(() => {

    // initializeZoom();
  }, []);

  // const startMeeting = async () => {
  //   try {
  //     await ZoomUs.startMeeting({
  //       userName: "Test User",
  //       meetingNumber: "YOUR_MEETING_ID",
  //       userId: "YOUR_USER_ID",
  //       zoomAccessToken: "YOUR_ZOOM_ACCESS_TOKEN",
  //     });
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   }
  // };
  useEffect(() => {
    props.getWebinarDetail_(id);
  }, []);

  useEffect(() => {
    console.log('props.webinarDetail', props.webinarDetail);
    if (props.webinarDetail && props.webinarDetail.webinarId) {
      setWebinarDetail(props.webinarDetail);
    }
  }, [props.webinarDetail]);

  useEffect(() => {
    if (waitingForHost) {
      setTimeout(() => {
        Alert.alert("Waiting for the host.", "Host hasn't started this meeting yet, try again later.");
      },200)
    }
  }
  , [waitingForHost]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Webinar Detail" page={{pathname: '/(tabs)/webinar'}} />
      { webinarDetail && webinarDetail.webinarId &&
        <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{webinarDetail.title}</Text>
          </View>
        </View>

        {/* Meeting Time */}
        <View style={styles.section}>
          <Icon name="clock-outline" size={20} color="#333" />
          <Text style={styles.time}>{formatDate(webinarDetail.date)} ({formatTime(webinarDetail.time)})</Text>
        </View>
        {/* Horizontal Line */}
        <View style={styles.horizontalLine} />

        {/* Meeting Description */}
        <View style={styles.section}>
          <Icon name="note-outline" size={20} color="#333" />
          <Text style={styles.description}>
            {webinarDetail.description}
          </Text>
        </View>
        <View style={styles.horizontalLine} />

        {/* Zoom Invite */}
        <View style={styles.section}>
          <Icon name="link-variant" size={20} color="#333" />
          <View>
            <Text style={styles.inviteText}>
              You are Invited to a scheduled Meeting
            </Text>
            <Text style={styles.topic}>
              Topic: <Text style={{ fontWeight: 'bold' }}>{webinarDetail.title}</Text>
            </Text>
          </View>
        </View>
        {new Date().getTime() - new Date(`${new Date(new Date(webinarDetail.date).setUTCHours(...webinarDetail.time?.split(':').map(Number), 0, 0)).toISOString()}`).getTime() > 6 * 60 * 60 * 1000 ? (
          <Text style={styles.endedText}>Webinar has ended</Text> 
        ) : (
          new Date(`${new Date(new Date(webinarDetail.date).setUTCHours(...webinarDetail.time?.split(':').map(Number), 0, 0)).toISOString()}`).getTime() - new Date().getTime() > ((5 * 60 * 1000) + (5.5 * 60 * 60 * 1000)) ? (
            <Text style={styles.endedText}>Webinar Can be Joined Only Before 5 Minutes</Text>
          ) : (
          <TouchableOpacity style={styles.button} onPress={joinMeeting}>
            <Text style={styles.buttonText}>Join Meeting</Text>
          </TouchableOpacity>
        ))}
      </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  endedText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  horizontalLine: {
    borderBottomWidth: 3,
    borderBottomColor: '#F0F0FF',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',
  },
  headerText: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    gap: 10,
  },
  time: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  inviteText: {
    fontSize: 14,
    color: '#333',
  },
  topic: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state: any) => ({
  webinarDetail: state.webinarDetail?.response,
  login: state.login?.response,
  otpLogin: state.otpLogin?.response
});

const mapDispatchToProps = (dispatch: any) => ({
  getWebinarDetail_: (id: any) => dispatch(getWebinarDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebinarDetail);
