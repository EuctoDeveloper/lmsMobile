import Header from "@/components/Input/Header";
import useBackHandler from "@/hooks/useBackHandler";
import { enableAutoNavigate, enrollCourse, getCourseList } from "@/store/action/common/courseAction";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

function CourseList(props: any) {
    const [courseList, setCourseList] = useState<any>([]);
    const [enrollCourseId, setEnrollCourseId] = useState(null);
    useBackHandler();

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
        props.getCourseList_();
    }, []);
    useEffect(() => {
        if(props.courseList && Array.isArray(props.courseList)){
            setCourseList(props.courseList);
        }
    }
    , [props.courseList]);
    const courseClick = (item: any) =>{
      if(item.notEnrolled){
        setEnrollCourseId(item.courseId);
      } else {
        props.enableAutoNavigate_();
        router.push({pathname: '/Pages/Course', params:{id: item.courseId, disableForcePush: 'false'}});
      }
    }    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Courses" page={"(tabs)"}  />
            <FlatList
                data={courseList}
                keyExtractor={(item: any) => item.courseId}
                renderItem={({ item }: any) => (
                    <TouchableOpacity style={{padding: 10}} onPress={()=>courseClick(item)}>
                        <Card
                            style={{
                                padding: 20,
                                borderRadius: 0,
                                elevation: 5,
                                backgroundColor: 'white',
                            }}
                        >
                            <View style={{flexDirection: 'row'}}>
                            <Image source={{ uri: item.image }} style={{width: 40, height: 40}} />
                            <View style={{marginHorizontal: 15, width: "85%"}}>
                                    <Text style={{fontWeight: "bold", fontSize: 15}}>{item.title}</Text>
                                    <Text style={{fontSize: 12, fontWeight:"thin", color:"grey"}}>{item.description}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => ({
    courseList: state.courseList?.response,
    enrollCourse: state.enrollCourse?.response,

});
  
const mapDispatchToProps = (dispatch: any) => ({
    getCourseList_: () => dispatch(getCourseList()),
    enrollCourse_: (id: any) => dispatch(enrollCourse(id)),
    enableAutoNavigate_: () => dispatch(enableAutoNavigate()),

});
  
export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
  