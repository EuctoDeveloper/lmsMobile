// import Header from "@/components/Input/Header";
// import { disableAutoNavigate, getLesson } from "@/store/action/common/courseAction";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { connect } from "react-redux";
// import CardSwiper from "@/components/Activity/CardSwiper";
// import QuestionAnswerComponent from "@/components/Activity/JumbledMatch";

// function Activity(props: any) {

//     const {id} = useLocalSearchParams();

//     const [lessonDetail, setLessonDetail] = useState<any>(null);
//     const [activity, setActivity] = useState<any>(null);


//     useEffect(() => {
//         props.getLesson_(id);
//     },[]);
//     useEffect(()=>{
//         if(props.lessonDetail){
//             setLessonDetail(props.lessonDetail);
//             setActivity(props.lessonDetail?.activity);
//         }
//     }, [props.lessonDetail]);

//     return(
//         <SafeAreaView style={styles.container}>
//             <Header title={"Activity"} page={{pathname: '/Pages/Course', params:{id: lessonDetail?.courseId, disableForcePush: 'true'}}} /> 
//             {activity && (activity.type === 'card' ? <CardSwiper /> : <QuestionAnswerComponent id={id} questionsAndAnswers={activity.questions} />) }
//         </SafeAreaView>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f9f9f9',
//     },
// })


// const mapStateToProps = (state: any) => ({
//     lessonDetail: state.lessonDetail?.response,
// });
    
// const mapDispatchToProps = (dispatch: any) => ({
//     getLesson_: (lessonId: any) => dispatch(getLesson(lessonId)),
//     disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
// });
  
// export default connect(mapStateToProps, mapDispatchToProps)(Activity);