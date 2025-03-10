import Header from '../../components/Input/Header';
import { getCompletedCourses, getMyAchievements } from '../../store/action/common/courseAction';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';



const TabTwoScreen = (props: any) => {

  const [activeTab, setActiveTab] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    props.getMyAchievements_();
    props.getCompletedCourses_();
  }, []);

  useEffect(() => {
    if (props.myAchievements && Array.isArray(props.myAchievements)) {
      setAchievements(props.myAchievements);
    }
  }, [props.myAchievements]);

  useEffect(() => {
    if (props.completedCourses && Array.isArray(props.completedCourses)) {
      setCourses(props.completedCourses);
    }
  }, [props.completedCourses]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const certificateDownload = async (courseId: any, url:any) => {
    // if (Platform.OS === 'android') {
    //   const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    //   if (status !== 'granted') {
    //     console.error("Permission to access media library is required.");
    //     return;
    //   }
    // } else {
    //   // For iOS or lower Android versions, no extra permissions needed
    //   const { status } = await MediaLibrary.requestPermissionsAsync();
    //   if (status !== 'granted') {
    //     console.error("Permission to access media library is required.");
    //     return;
    //   }
    // }
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error("Permission to access media library is required.");
      Alert.alert("Permission Denied", "You need to grant access to the media library.");
      return;
    }
    const fileUri = `${FileSystem.documentDirectory}filename.png`;
    try {
      const { uri: downloadedUri } = await FileSystem.downloadAsync(url, fileUri, {
      });
      const asset = await MediaLibrary.createAssetAsync(downloadedUri);
      if (Platform.OS === 'ios') {
        // await MediaLibrary.createAlbumAsync("Download", asset, false);
      }
      const message = Platform.OS === 'ios' ? 
      "File successfully saved to Photos" : 
      "File successfully saved to Gallery";
      
      Alert.alert("Success", message);

    } catch (error) {
        console.error('Error downloading certificate:', error);
    }
  }
  

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.courseImage }} style={styles.certimage} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.courseTitle}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>🗓️ {new Date(item.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - {new Date(item.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
        </View>
        <View style={{...styles.infoContainer, marginTop: 10}}>
          <Text style={styles.info}>🎯 Assessment Score: {item.totalScore}/{item.totalGrade}</Text>
        </View>
      </View>
    </View>
  );

  const renderCertificate = ({item}: any)=> {
    return (
      <>
        <View style={styles.certcard}>
          <View>
            <Image source={{ uri: item.certificate }} style={styles.certimage} />
            <TouchableOpacity style={styles.downloadButton} onPress={() => {certificateDownload(item.courseId, item.certificate)}}>
                <Text style={{ color: 'white' }}>Download</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description.length > 75 ? `${item.description.substring(0, 70)}...` : item.description}</Text>
          </View>
        </View>
        <Divider bold={true} theme={{ colors: { primary: 'green' } }} style={{marginVertical: 10}} />
      </>
    )
  }

  return (
    <View>
      <View style={styles.container}>
        <Header title={"My History"} page={"/(tabs)/"} />
        </View>
        <View>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, ...(activeTab === 1 ? [styles.activeTab] : [])]} onPress={()=>setActiveTab(1)}>
            <Text style={[styles.tabText, ...(activeTab === 1 ? [styles.activeTabText] : [])]}>My Achievement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, ...(activeTab === 2 ? [styles.activeTab] : [])]} onPress={()=>setActiveTab(2)}>
            <Text style={[styles.tabText, ...(activeTab === 2 ? [styles.activeTabText] : [])]}>My Certification</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginBottom: 350}}>
          {activeTab === 1 ?
            <FlatList
              data={achievements}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id}
              contentContainerStyle={styles.list}
            /> :

            <FlatList
              data={courses}
              renderItem={renderCertificate}
              contentContainerStyle={styles.list}
            />        
          }
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFCF7',
    paddingTop: 50
  },
  
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  activeTab: {
    backgroundColor: '#0B1934', // Dark blue for the active tab
    borderRadius: 5
  },
  tabText: {
    color: '#777',
    fontSize: 14,
  },
  activeTabText:{
    color: "white"
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
  },
  certcard: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  certimage: {
    width: 90,
    height: 70,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginVertical: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    fontSize: 12,
    color: '#777',
  },
  downloadButton: {
    backgroundColor: '#FCA50F',
    color: 'white',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: -10
  },
  arrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'gray',
  },

});


const mapStateToProps = (state: any) => ({
  myAchievements: state.myAchievements?.response,
  completedCourses: state.completedCourses?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMyAchievements_: () => dispatch(getMyAchievements()),
  getCompletedCourses_: () => dispatch(getCompletedCourses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabTwoScreen);

