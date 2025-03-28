import { Image, StyleSheet, Platform, ImageBackground, View, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import { ThemedText } from '../../components/ThemedText';
import { connect } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { TextInput, Button, Icon } from 'react-native-paper';
import { useFocusEffect, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Carousel from '../../components/Element/Carousel';
import CircleProgress from '../../components/Element/CircleProgress';
import NotificationBell from '../../components/Element/NotificationBell';
import { enableAutoNavigate, enrollCourse, getNotifications, getRecentCourses } from '../../store/action/common/courseAction';
import { FontAwesome5 } from '@expo/vector-icons';
import useBackHandler from '../../hooks/useBackHandler';
import { getUpcomingWebinar } from '../../store/action/common/webinarActions';

function HomeScreen(props: any) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [enrollCourseId, setEnrollCourseId] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [upcomingWebinar, setUpcomingWebinar] = useState<any>(null);
  useBackHandler();

  // This will store the current scroll position
  const [scrollY, setScrollY] = useState(0);
  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or data update
      props.getRecentCourses_();
      props.getNotifications_();
      props.getUpcomingWebinar_();

  };
  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <ThemedText style={styles.title}>{item.title}</ThemedText>
    </View>
  );
  useEffect(() => {
    props.getNotifications_();
    getName();
    props.getRecentCourses_();
  }, []);
  useFocusEffect(
    useCallback(()=>{
      getName();
      props.getUpcomingWebinar_();
    }, [])
  )
  useEffect(() => {
    if(props.recentCourses && props.recentCourses.length > 0){
      setCourses(props.recentCourses);
    }
    setRefreshing(false);
  }, [props.recentCourses]);
  useEffect(() => {
      if(enrollCourseId)
        props.enrollCourse_(enrollCourseId);
  }, [enrollCourseId]);
  useEffect(() => {
    if(enrollCourseId && props.enrollCourse && props.enrollCourse.message && props.enrollCourse.message.includes('success')){
      setEnrollCourseId(null);
      props.enableAutoNavigate_();
      router.push({pathname: '/Pages/Course', params:{id: enrollCourseId, disableForcePush: 'false'}});
    }
  }, [props.enrollCourse]);
  useEffect(() => {
    if(props.notifications && Array.isArray(props.notifications)){
      setNotificationCount(props.notifications.filter((item: any)=>!item.dirty).length);
    }
  }, [props.notifications]);
  useEffect(() => {
    if(props.upcomingWebinar && props.upcomingWebinar.date){
      setUpcomingWebinar(props.upcomingWebinar);
    } else {
      setUpcomingWebinar(null);
    }
  }, [props.upcomingWebinar]);

  const getName = () => {
    const fName = SecureStore.getItem('firstName') || props?.login?.userData?.firstName || props?.otpLogin?.userData?.firstName;
    const lName = SecureStore.getItem('lastName') || props?.login?.userData?.lastName || props?.otpLogin?.userData?.lastName;
    if (fName || lName) {
      setName(fName + ' ' + lName);
    }
  };
  const courseClick = (item: any) =>{
    if(item.notEnrolled){
      setEnrollCourseId(item.courseId);
    } else {
      props.enableAutoNavigate_();
      router.push({pathname: '/Pages/Course', params:{id: item.courseId, disableForcePush: 'false'}});
    }
  }
  const meetClick = (id: any) =>{
    props.enableAutoNavigate_();
    router.push({pathname: '/Pages/WebinarDetail', params:{id}});
  }
  const formatDate = (timestamp: any) => {
    let date = new Date(timestamp);
    let options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
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
  return (
      <ScrollView style={{ flex: 1 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            // Customize pull distance (to trigger refresh with slight pull)
            progressViewOffset={-30}  // Optional: Adjust visual feedback
            enabled={scrollY <= 0}  // Only enable refresh when at the top
          />
        }
        onScroll={({ nativeEvent }) => {
          // Keep track of scroll position
          setScrollY(nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
      >
        <ImageBackground
          source={require('../../assets/images/mainBgHead.png')}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={{marginTop: Platform.OS === "android" ? 40 : 60}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
              <View style={{margin: 0, padding: 0, marginTop: 10}}>
              <FontAwesome5 name="user-circle" size={40} color={"white"} />
              </View>
              <View style={{marginBottom: 50}}>
                <ThemedText
                  style={{
                    fontSize: 15,
                    color: 'white',
                    marginBottom: 5,
                  }}
                >
                  Welcome Back 👋
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 24,
                    color: 'white',
                    fontWeight:"bold",
                    marginLeft: 0,
                  }}
                  key={name}
                >
                    {name.length > 18 ? name.substring(0, 15) + '...' : name}
                </ThemedText>
              </View>
              <View style={{marginTop: 10}}>
                <Button
                  mode="text"
                  onPress={()=>{router.push('/Pages/NotificationList')}}
                  color="white"
                  style={{ overflow: 'visible' }}
                >
                  <NotificationBell count={notificationCount} mode={'light'} />
                </Button>
              </View>
            </View>
          </View>
          </ImageBackground>
          {courses.length > 0 &&
          <View style={{}}>
            <TouchableOpacity style={{ backgroundColor: '#FEB053', padding: 10, borderRadius: 5, margin: 10, marginTop: 10 }} >
              <ThemedText style={{ fontSize: 15, color: 'white' }}>Recent</ThemedText>
              <TouchableOpacity style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                backgroundColor:"#FFD19C",
                borderRadius: 20,
                padding:10
              }} onPress={()=>courseClick(courses[0])} >
                  <ThemedText style={{ fontSize: 15, fontWeight: 600, marginTop: 5 }}>
                  {courses[0]?.title.length > 11 ? courses[0]?.title.substring(0, 11) + '...' : courses[0]?.title}
                  </ThemedText>
                <View style={{
                  borderRadius: 10, 
                  backgroundColor:"#FEA234",
                  marginLeft:10, 
                  paddingLeft: 15, 
                  paddingRight: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  flexDirection: 'row',
                }}>
                  <ThemedText style={{
                    fontSize: 16, 
                    color: 'white', 
                  }}>
                      End - 
                      <TextInput.Icon icon="calendar-month-outline" color="white" size={25} style={{marginTop: Platform.OS ==="ios" ? -35:15}} />
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 16, 
                    color: 'white', 
                    marginLeft: Platform.OS === "ios" ? 25:2,
                  }}>
                      {new Date(courses[0].endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </ThemedText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>courseClick(courses[0])} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: "#FFD19C",
                    borderRadius: 50,
                    padding: 25,
                  }}>
                    <TextInput.Icon icon="check-circle" color="#FEA234" size={35} style={{marginTop: 30, marginLeft: 33}} />
                  </View>
                  <View>
                    <ThemedText style={{ fontSize: 15, color: 'black', marginLeft: 5 }}>Completed</ThemedText>
                    <ThemedText style={{ fontSize: 15, color: 'black', marginLeft: 5, fontWeight: 700 }}>{courses[0].completedPercentage || 0} %</ThemedText>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: "#FFD19C",
                    borderRadius: 50,
                    padding: 25,
                  }}>
                    <TextInput.Icon icon="book" color="#FEA234" size={35} style={{marginTop: 30, marginLeft: 33}} />
                  </View>
                  <View>
                    <ThemedText style={{ fontSize: 15, color: 'black', marginLeft: 5 }}>Total Modules</ThemedText>
                    <ThemedText style={{ fontSize: 15, color: 'black', marginLeft: 5, fontWeight: 700 }}>{courses[0].modules?.length || 1}</ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
              { upcomingWebinar &&
                <TouchableOpacity onPress={()=>meetClick(upcomingWebinar.webinarId)} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: "#FFD19C",
                      borderRadius: 50,
                      padding: 25,
                    }}>
                      <TextInput.Icon icon="account-group" color="#FEA234" size={35} style={{marginTop: 30, marginLeft: 33}} />
                    </View>
                    <View>
                      <ThemedText style={{ fontSize: 15, color: 'black', marginLeft: 5 }}>Upcoming Meeting</ThemedText>
                      <ThemedText style={{ fontSize: 15, color: 'black', marginLeft: 5, fontWeight: 700 }}>{formatDate(upcomingWebinar.date)} | {formatTime(upcomingWebinar.time)}</ThemedText>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: "#FFD19C",
                      borderRadius: 5,
                      paddingHorizontal: 5,
                      paddingVertical: 5
                    }}>
                        <ThemedText style={{
                        color: '#FEA234', fontWeight: 800}}>View &gt;</ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ThemedText style={{fontSize: 20, margin: 10, fontWeight: 600}}>My Courses</ThemedText>
              <TouchableOpacity onPress={()=>router.push("/Pages/CourseList")}>
                <ThemedText style={{fontSize: 15, margin: 10, color:"#FF8B00"}}>See All &gt;</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom:50}}>
              <Carousel data={courses}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer} onPress={()=>courseClick(item)}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <ThemedText style={styles.title}>{item.title}</ThemedText>
                  <ThemedText style={styles.description}>{item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}</ThemedText>
                  <ThemedText style={styles.description}>Course expires: {new Date(item.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</ThemedText>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
                    <ThemedText style={styles.progressText}>Modules: {item.modules?.length}</ThemedText>
                    <View>
                      <CircleProgress percentage={item.completedPercentage? item.completedPercentage : 0} />
                    </View>
                  </View>
                </TouchableOpacity>
              )} />
            </View>
          </View>
          }
      </ScrollView>
  );
}

const mapStateToProps = (state: any) => ({
  notifications: state.notifications?.response,
  recentCourses: state.recentCourses?.response,
  enrollCourse: state.enrollCourse?.response,
  login: state.login?.response,
  otpLogin: state.otpLogin?.response,
  upcomingWebinar: state.upcomingWebinar?.response
});

const mapDispatchToProps = (dispatch: any) => ({
  getNotifications_ : () => dispatch(getNotifications()),
  getRecentCourses_: () => dispatch(getRecentCourses()),
  enrollCourse_: (id: any) => dispatch(enrollCourse(id)),
  enableAutoNavigate_: () => dispatch(enableAutoNavigate()),
  getUpcomingWebinar_: () => dispatch(getUpcomingWebinar())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 0,
    marginRight: 25,
    width: 250,
  },
  image: {
    height: 150,
    width: 250,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  description: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    textAlign: 'left',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: 5
  },
  counter: {
    marginTop: 20,
    fontSize: 16,
  },
});
