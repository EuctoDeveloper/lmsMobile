import Header from "../../components/Input/Header";
import { disableAutoNavigate, getLesson } from "../../store/action/common/courseAction";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import CardSwiper from "../../components/Activity/CardSwiper";
import QuestionAnswerComponent from "../../components/Activity/JumbledMatch";

function Activity(props: any) {

    const {id, index} = useLocalSearchParams();

    const [lessonDetail, setLessonDetail] = useState<any>(null);
    const [activity, setActivity] = useState<any>(null);


    useEffect(() => {
        setActivity(null);
        props.getLesson_(id);
    },[]);
    useEffect(()=>{
        if(props.lessonDetail){
            setLessonDetail(props.lessonDetail);
            if(props.lessonDetail?.activity) {
                setActivity(props.lessonDetail?.activity[index]);
            }
        }
    }, [props.lessonDetail]);

    return(
        <SafeAreaView style={styles.container}>
            <Header title={"Activity"} page={{pathname: '/Pages/Course', params:{id: lessonDetail?.courseId}}} onBack={()=>{
                setActivity(null);
            }} /> 
            {activity && (activity.type === 'card' ? <CardSwiper id={id} cards={activity.questions} key={activity.questions} courseId={props.lessonDetail.courseId} /> : <QuestionAnswerComponent id={id} questionsAndAnswers={activity.questions} key={activity.questions} courseId={props.lessonDetail.courseId} />) }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
})


const mapStateToProps = (state: any) => ({
    lessonDetail: state.lessonDetail?.response,
});
    
const mapDispatchToProps = (dispatch: any) => ({
    getLesson_: (lessonId: any) => dispatch(getLesson(lessonId)),
    disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Activity);
