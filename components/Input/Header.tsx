import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NotificationBell from '@/components/Element/NotificationBell';
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { connect } from "react-redux";
import { disableAutoNavigate, getNotifications, getRecentCourses } from "@/store/action/common/courseAction";
import { useEffect, useState } from "react";



const Header = (props: any) =>{
    const [notificationCount, setNotificationCount] = useState(0);
    const params = useLocalSearchParams();
    const rter = useRouter()

    const goBack = async () => {
        if(props.onBack){
            await props.onBack();
        }
        props.disableAutoNavigate_();
        router.push(props.page);
        // rter.back();
    }
    useEffect(() => {
      if(props.notifications && Array.isArray(props.notifications)){
        setNotificationCount(props.notifications.filter((item: any)=>!item.dirty).length);
      }
    }, [props.notifications]);
  
    return (

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{props.title}</Text>
            <NotificationBell count={notificationCount} mode={"dark"} hideBellIcon={props.hideBellIcon} />
        </View>
    )
}

const mapStateToProps = (state: any) => ({
    notifications: state.notifications?.response,

});

const mapDispatchToProps = (dispatch: any) => ({
    getNotifications_ : () => dispatch(getNotifications()),
    getRecentCourses_: () => dispatch(getRecentCourses()),
    disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FBFCF7',
    },
        backButton: {
        padding: 8,
    },
        headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
        notificationButton: {
        padding: 8,
    },
      
});