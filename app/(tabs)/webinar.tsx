import MonthPicker from '../../components/Element/MonthPicker';
import { getWebinarList } from '../../store/action/common/webinarActions';
import { router } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';
import { Image } from 'react-native';



const MeetingSchedule = (props: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [webinarList, setWebinarList] = useState<any>([]);
  const listRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    props.getWebinarList_(selectedMonth);
  }
  , [selectedMonth]);

  useEffect(() => {
    if (props.myWebinars && Array.isArray(props.myWebinars)) {

      let wbList = JSON.parse(JSON.stringify(props.myWebinars));
      wbList = wbList.map((item: any) => {
        return {
          _id: item._id,  
          webinars: item.webinars.sort((a: any, b: any) => {
            return a.time.localeCompare(b.time);
        })
        };
      });  
      const sortedWebinars = wbList.sort((a, b) => new Date(a._id) - new Date(b._id));
      setWebinarList(sortedWebinars);
      if (selectedMonth.isSame(moment(), 'month')) {
        const today = new Date().toISOString().split('T')[0];
        const upcomingIndex = sortedWebinars.findIndex((item) => item._id >= today);

        if (upcomingIndex !== -1 && listRef.current) {
          setTimeout(() => {
            listRef.current?.scrollToIndex({ index: upcomingIndex, animated: true });
          }, 500); // Delay to ensure list renders before scrolling
        }
      }
    } else {
      setWebinarList([]);
    }
  }, [props.myWebinars]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long' 
    }).format(date);
  }
  const formatTime = (timeString: any) => {
    let [hours, minutes] = timeString.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
  }
  const changeMonth = (date: any) => {
    setSelectedMonth(date);
  }

  return (
    <View style={styles.container}>
      {/* Custom Dropdown + Today Button */}
      <View style={styles.header}>
        <MonthPicker key={selectedMonth} selectedMonth={selectedMonth} changeMonth={changeMonth} />
        <TouchableOpacity>
          <Text onPress={()=>{
            setSelectedMonth(moment());
          }} style={styles.today}>Today</Text>
        </TouchableOpacity>
      </View>

      {/* Meetings List */}
      {
      webinarList.length === 0 ? 
      <View>
        <View style={styles.noDataContainer}>
          <Image source={require('../../assets/images/no-data.png')} style={{ width: "60%", height: "60%" }} />
          <Text style={styles.noDataText}>No meeting scheduled from mentor</Text>
        </View>
      </View>:
      <FlatList
        ref={listRef}
        data={webinarList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.date}>{formatDate(item._id)}</Text>
            <FlatList
              data={item.webinars}
              keyExtractor={(webinar) => webinar.webinarId}
              renderItem={(webinar) => (
                <>
                  {webinar ? (
                    <View style={styles.meetingCard}>
                      <TouchableOpacity onPress={()=>{
                        router.push({pathname: '/Pages/WebinarDetail', params: {id: webinar.item.webinarId}});
                      }}>
                        <Text style={styles.meetingTime}>{formatTime(webinar.item.time)}</Text>
                        <Text style={styles.viewText}>View</Text>
                      </TouchableOpacity>
                      <View style={styles.meetingDetails}>
                        <Text style={styles.meetingTitle}>{webinar.item.title}</Text>
                        <Text style={styles.meetingTime2}>📞 {formatTime(webinar.item.time)}</Text>
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.noMeeting}>No Meeting</Text>
                  )}
                </>
              )}
            />
          </View>
        )}
      />
  }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 6,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    width: 180,
    borderRadius: 6,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  dropdownItem: {
    fontSize: 16,
    padding: 10,
    color: '#000',
  },
  today: {
    color: '#FF6600',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#D3D3D3',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  noMeeting: {
    fontSize: 14,
    color: '#6E6E6E',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  meetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 6,
  },
  viewText: {
    color: '#007AFF',
    fontSize: 14,
    marginRight: 10,
  },
  meetingDetails: {
    flex: 1,
    backgroundColor: '#FFEFE6',
    borderLeftColor: '#FF6600',
    borderLeftWidth: 4,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  meetingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 10,
  },
  meetingTime: {
    fontSize: 12,
    color: '#555',
  },
  meetingTime2: {
    fontSize: 12,
    color: '#555',
    marginLeft: 10,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    },
    noDataText: {
      marginTop: 20,
      fontSize: 20,
      color: '#6E6E6E',
      fontWeight: 'bold',
    },
});
const mapStateToProps = (state: any) => ({
  me: state.me?.response,
  myWebinars: state.myWebinars?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  getWebinarList_: (date: any) => dispatch(getWebinarList(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingSchedule);
