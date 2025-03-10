import Header from '../../components/Input/Header';
import { disableAutoNavigate, getLesson, resetLessonProgress } from '../../store/action/common/courseAction';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

const AssessmentIntro = (props: any) => {
  const {id} = useLocalSearchParams();

  const [lessonDetail, setLessonDetail] = useState<any>(null);

  useEffect(() => {
    props.resetLessonProgress_();
    props.getLesson_(id);
  },[]);
  useEffect(()=>{
      if(props.lessonDetail){
          setLessonDetail(props.lessonDetail);
      }
  }, [props.lessonDetail]);

  const startAssesment = ()=>{
    router.push({pathname: '/Pages/Assessment', params:{id}});
  }
  return (
    <SafeAreaView style={styles.container}>
        <Header title={"Assessment"} page={{pathname: '/Pages/Course', params:{id: lessonDetail?.courseId, disableForcePush: 'true'}}} /> 

      {/* Quiz Info */}
      <View style={styles.quizInfo}>
        <Text style={styles.quizTitle}>{props.lessonDetail?.module?.title} Assessment</Text>
        <Text style={styles.quizDetails}>Question {lessonDetail?.questions?.length} | Mark {lessonDetail?.totalGrade}</Text>
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionHeader}>General Instructions:</Text>
        <Text style={styles.instructionText}>
          • <Text style={styles.boldText}>Read carefully:</Text> Please read all instructions carefully before beginning the test.
        </Text>
        <Text style={styles.instructionText}>
          • <Text style={styles.boldText}>Time management:</Text> Allocate your time wisely to ensure you complete all sections.
        </Text>
        <Text style={styles.instructionText}>
          • <Text style={styles.boldText}>Multiple choice:</Text> Circle or bubble in the letter corresponding to your chosen answer.
        </Text>
      </View>

      {/* Buttons */}
      <ImageBackground source={require('../../assets/images/assesIntro.png')} style={{flex: 0.6}}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.startButton} onPress={startAssesment}>
            <Text style={styles.startButtonText}>Start Assessment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            props.disableAutoNavigate_();
            router.push({pathname: '/Pages/Course', params:{id: lessonDetail?.courseId, disableForcePush: 'true'}})
          }}>
            <Text style={styles.backText}>Back to Course</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationIcon: {
    fontSize: 16,
    color: '#000',
  },
  quizInfo: {
    paddingHorizontal: 16,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  quizDetails: {
    fontSize: 16,
    color: '#555',
  },
  instructions: {
    paddingHorizontal: 16,
    marginVertical: 30
  },
  instructionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    paddingTop: 180,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FF6C00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 40,
    borderRadius: 6,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: '#FF0000',
    marginTop: 20,
    fontSize: 16,
  },
});



const mapStateToProps = (state: any) => ({
  lessonDetail: state.lessonDetail?.response,
  saveLessonProgressData: state.saveLessonProgress?.response,
});
  
const mapDispatchToProps = (dispatch: any) => ({
  getLesson_: (lessonId: any) => dispatch(getLesson(lessonId)),
  disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
  resetLessonProgress_: () => dispatch(resetLessonProgress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentIntro);