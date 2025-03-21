import React from "react";
import Header from "../../components/Input/Header";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResizeMode, Video } from 'expo-av';
import { connect } from "react-redux";
import { getCourseDetail, resetCourseDetail, resetLessonProgress, saveLessonProgress } from "../../store/action/common/courseAction";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemedText } from "../../components/ThemedText";
import { Divider } from 'react-native-paper';
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';

function Course(props: any) {
    const params = useLocalSearchParams();
    const routeName = useNavigationState(state => {
        const route = state.routes[state.index];
        return route.name;
      });
    const id = params.id;
    const [disableForcePush, setDisableForcePush] = useState('true');
    const [courseDetail, setCourseDetail] = useState<any>(null);
    const [videoLink,  setVideoLink] = useState<any>(null);
    const [activeLessonId, setActiveLessonId] = useState<any>(null);
    const [lesson, setLesson] = useState<any>(null);
    const videoRef = useRef<any>(null);
    const [lastUpdatedSeconds, setLastUpdatedSeconds] = useState(0);
    const [lastUpdatedPercentage, setLastUpdatedPercentage] = useState(0);
    useFocusEffect(
        useCallback(() => {
            console.log('Course Detail: ', courseDetail);
            if(!courseDetail)
                console.log('Getting Course Detail: ', id);
                props.getCourseDetail_(id);
        }, [id]
    ));
    useFocusEffect(
        useCallback(() => {
            console.log('Auto Navigate: ', props.courseDetail);
            if(props.courseDetail && routeName === "Pages/Course"){
                setActiveLessonId(null)
                let lessonSelected = false;
                setCourseDetail(props.courseDetail);
                if(props.courseDetail?.modules && props.courseDetail?.modules.length > 0){
                    for(let i=0; i<props.courseDetail?.modules.length; i++){
                        if(props.courseDetail.modules[i].progress.isCompleted){
                            continue;
                        }
                        if(props.courseDetail.modules[i].lessons?.length > 0){
                            let videoLessons = props.courseDetail.modules[i].lessons.filter((item: any)=>item.type === "video")
                            if(lessonSelected === false && props.autoNavigate){
                                for(let j=0; j<videoLessons?.length; j++){
                                    if(videoLessons[j].progress.isLessonCompleted){
                                        continue;
                                    }
                                        lessonSelected = true;
                                        lessonClick(videoLessons[j])
                                        setActiveLessonId(videoLessons[j].lessonId);
                                        break;
                                }
                                let assessmentLessons = props.courseDetail.modules[i].lessons.filter((item: any)=>item.type === "assessment")
                                for(let j=0; j<assessmentLessons?.length; j++){
                                    if(assessmentLessons[j].progress.isLessonCompleted){
                                        continue;
                                    }
                                    else if(lessonSelected){
                                        break;
                                    }
                                    else if(activeLessonId !== assessmentLessons[j].lessonId) {
                                        lessonClick(assessmentLessons[j])
                                        setActiveLessonId(assessmentLessons[j].lessonId);
                                        lessonSelected=true;
                                    }
                                    break;
                                }
                            }
                        }
                        if(lessonSelected){
                            break;
                        }
                    }
                }
            }
        }, [props.courseDetail])
    );
    useEffect(() => {
        if(videoLink && lastUpdatedPercentage >=100 && props.saveLessonProgress && props.saveLessonProgress.message && props.saveLessonProgress.message.includes('Success')){
            props.resetLessonProgress_();
            props.getCourseDetail_(id);
        }
    }, [props.saveLessonProgress]);
    useEffect(() => {
        if(videoRef.current) {
            // console.log('Setting Video Position: ', lesson.progress.completedTime || 0);
            (async ()=> {
                // await videoRef.current.playFromPositionAsync(lesson.progress.completedTime || 0);
                // await videoRef.current.playAsync();
            })();
        }
    }, [videoRef.current])

    const lessonClick = async (lesson: any, hardClick=false) => {
        if (routeName !== "Pages/Course") return;
        setLesson(lesson);
        if(lesson.type === "video"){
            if(videoLink !== lesson.source){
                if(videoRef.current) {
                    videoRef.current.unloadAsync();
                }
                setVideoLink(lesson.source);
                setActiveLessonId(lesson.lessonId);
                console.log('Setting Video Position: ', lesson.progress.completedTime || 0); 
                setTimeout(async()=>
                {
                    if (videoRef.current) {
                        await videoRef.current.playFromPositionAsync(lesson.progress.completedPercentage < 100 ? lesson.progress.completedTime || 0 : 0);
                        // await videoRef.current.playAsync();
                    }
                }, 1500);
            }
        } else {
            // redirect to course Page
            setVideoLink(null);
            if((props.autoNavigate || hardClick) && lesson.progress.isLessonCompleted) {
                router.push({pathname: '/Pages/AssesmentOutro', params:{id: lesson.lessonId}});
            }
            else if((props.autoNavigate || hardClick)) {
                if(lesson.progress.completedPercentage === 0){
                    router.push({pathname: '/Pages/AssessmentIntro', params:{id: lesson.lessonId}});
                } else {
                    router.push({pathname: '/Pages/Assessment', params:{id: lesson.lessonId}});
                }
            }
        }
    }
    const activityClick = (lesson: any, index: any) => {
        setVideoLink(null);
        router.push({pathname: '/Pages/Activity', params:{id: lesson.lessonId, index}});
    }
    const handleProgress = (status:any) => {
        if(status.positionMillis === 0 && lastUpdatedPercentage !== 0){
            setLastUpdatedPercentage(0)
        }
        if (status.isPlaying) {
            if (status.positionMillis / 1000 > lastUpdatedSeconds + 1 && status.positionMillis > lesson.progress.completedTime) {
                setLastUpdatedSeconds(status.positionMillis / 1000);
                const ratio = status.positionMillis / status.durationMillis;
                const completedPercentage = Math.round(ratio * 100);
                props.saveLessonProgress_(activeLessonId, {completedTime: status.positionMillis, completedPercentage});
            }
        }
    
        // Handle the end of the video
        if (status.didJustFinish && !status.isLooping) {
            setLastUpdatedSeconds(0)
            setLastUpdatedPercentage(100);
            const ratio = status.positionMillis / status.durationMillis;
            const completedPercentage = Math.round(ratio * 100);
            const isCompleted = completedPercentage === 100;
            props.saveLessonProgress_(activeLessonId, {completedTime: status.positionMillis, completedPercentage, isCompleted});
        }
      };
    return (
        <SafeAreaView style={{flex: 1}}>
                <Header title={"My Course"} page={"/(tabs)/"} onBack={()=>{
                    if(videoRef.current) {
                        videoRef.current.unloadAsync();
                    }
                    props.resetCourseDetail_();
                }} />
                { videoLink &&
                <Video
                    ref={videoRef}
                    source={{ uri: videoLink }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    style={styles.video}
                    onError={(e) => console.log('Video Error: ', e)}
                    onPlaybackStatusUpdate={handleProgress}
                    onFullscreenUpdate={async ({ fullscreenUpdate }) => {
                        if(fullscreenUpdate === 1){
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
                        } else {
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
                        }
                    }}
                />}
            <ScrollView>
                <View style={{paddingVertical: 16}}>
                    <View style={{paddingHorizontal: 16}}>
                        <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>{courseDetail?.title}</ThemedText>
                        <ThemedText style={{color: "#545454", fontSize: 12}}>{courseDetail?.description}</ThemedText>
                    </View>

                    <Divider style={{ marginVertical: 16, backgroundColor: "black"}} />
                    <FlatList
                        data={courseDetail?.modules}
                        style={{margin: 0}}
                        renderItem={(course: any) => (
                            <View>
                                <ThemedText style={{fontSize: 10, paddingHorizontal: 16}}>{course.item.title}</ThemedText>
                                <FlatList
                                    data={course.item.lessons.filter((lesson: any)=> lesson.type === "video")}
                                    renderItem={({item, index}: any) => (
                                        <>
                                            <TouchableOpacity style={{marginBottom: 10, ...(item.lessonId === activeLessonId ? {backgroundColor: "rgba(164, 164, 255, 0.2);"}: {})}} onPress={()=>lessonClick(item, true)}>
                                                <View style={{paddingHorizontal: 16}}>
                                                    <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>{index+1}. {item.title}</ThemedText>
                                                    <ThemedText style={{marginLeft: 20, fontSize: 12}}>{item.content}</ThemedText>
                                                    <ThemedText style={{marginLeft: 20, fontSize:12}}>Video - {item.progress.completedPercentage}% completed</ThemedText>
                                                </View>
                                            </TouchableOpacity>
                                            {item.activity && item.activity.length > 0 &&
                                                <FlatList
                                                    data={item.activity.map((item: any, index:any) => ({...item, index}))}
                                                    style={{margin: 0}}
                                                    renderItem={(activity:any) => (
                                                        <TouchableOpacity style={{marginBottom: 10}} onPress={()=>activityClick(item, activity.index)}>
                                                            <View style={{paddingHorizontal: 16}}>
                                                                <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>{index+1}.{activity.index + 1} Activity</ThemedText>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                />
                                            }
                                        </>
                                    )}
                                />
                                <FlatList
                                data={course.item.lessons.filter((lesson: any)=> lesson.type !== "video")}
                                renderItem={({item, index}: any) => (
                                    <>
                                        <TouchableOpacity style={{marginBottom: 10, ...(item.lessonId === activeLessonId ? {backgroundColor: "rgba(164, 164, 255, 0.2);"}: {})}} onPress={()=>lessonClick(item, true)}>
                                            <View style={{paddingHorizontal: 16}}>
                                                <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>{index+1  + (course.item.lessons.filter((lesson: any)=> lesson.type === "video").length)}.  {item.title}</ThemedText>
                                                <ThemedText style={{marginLeft: 20, fontSize:12}}>Attempted Questions: {item.progress?.questions?.length || 0} / {item.questions?.length} | Points: {item.progress.score} / {item.questions?.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.points, 0)} </ThemedText>
                                            </View>
                                        </TouchableOpacity>
                                        {item.activity && item.activity.type && 
                                            <>
                                                <TouchableOpacity style={{marginBottom: 10}} onPress={()=>activityClick(item)}>
                                                    <View style={{paddingHorizontal: 16}}>
                                                        <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>{index+1}.1 Activity</ThemedText>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        }
                                    </>
                                )}
                            />
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = (state: any) => ({
    courseDetail: state.courseDetail?.response,
    saveLessonProgress: state.saveLessonProgress?.response,
    autoNavigate: state.autoNavigate?.response,
  });
  
  const mapDispatchToProps = (dispatch: any) => ({
    getCourseDetail_: (id: any) => dispatch(getCourseDetail(id)),
    saveLessonProgress_: (lessonId: any, data: any) => dispatch(saveLessonProgress(lessonId, data)),
    resetLessonProgress_: () => dispatch(resetLessonProgress()),
    resetCourseDetail_: () => dispatch(resetCourseDetail()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Course);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
        width: '100%',           // Set width to 100% of the container
        maxHeight: 300,          // Set the maximum height to 300
        aspectRatio: 16 / 9,
    },
  });
  