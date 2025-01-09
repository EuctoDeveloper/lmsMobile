import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Ensure you have expo-linear-gradient installed
import { connect } from 'react-redux';
import { disableAutoNavigate, getLesson, resetLessonProgress, saveLessonProgress } from '@/store/action/common/courseAction';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { ToastAndroid } from 'react-native';
import useBackHandler from '@/hooks/useBackHandler';


const Assessment = (props: any) => {

  const { id } = useLocalSearchParams();
  const [questionIndex, setQuestionIndex] = useState<any>(0);
  const [selectedOption, setSelectedOption] = useState<any>('');
  const [questions, setQuestions] = useState<any>([]);
  const [exit, setExit] = useState(false);
  useBackHandler();
  useEffect(() => {
    props.getLesson_(id);
  }, []);
  useEffect(() => {
    if(props.lessonDetail && Array.isArray(props.lessonDetail?.questions)){
      setQuestions(props.lessonDetail?.questions);
      if(props.lessonDetail?.completedPercentage > 0){
        setQuestionIndex(props.lessonDetail?.answeredQuestion.length);
      }
    }
  }, [props.lessonDetail]);

  useFocusEffect(
    useCallback(() => {
      console.log(props.saveLessonProgressData)
      if(props.saveLessonProgressData && props.saveLessonProgressData.message && props.saveLessonProgressData.message.includes('Success')){
        props.resetLessonProgress_();
        if(exit){
          setExit(false)
          props.disableAutoNavigate_();
          router.push({pathname: '/Pages/Course', params:{id: props.lessonDetail.courseId, disableForcePush: 'true'}});
        } else if(questionIndex + 1 < questions.length){
          setQuestionIndex(questionIndex + 1);
          setSelectedOption('');
        } else {
          console.log(id, props.lessonDetail)
          setQuestionIndex(0);
          router.push({pathname: '/Pages/AssesmentOutro', params:{id}});
        }
      }
    }, [props.saveLessonProgressData])
  );
  const checkValidSubmission = () => {
    if(selectedOption == null || selectedOption == ''){
      // if (Platform.OS === 'android') {
      //   ToastAndroid.showWithGravityAndOffset(
      //     'Select an option',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.TOP,
      //     0,
      //     100
      //   );
      // } else {
        Alert.alert('Select an option');
      // }
      return false;
    }
    return true;
  }

  const nextQuiz = (exit=false) => {
    if(checkValidSubmission()){
      if (exit) setExit(true);
      props.saveLessonProgress_(id, {questionId: questions[questionIndex]?._id, selectedOption});
      // if(questionIndex + 1 < questions.length){
      //   setQuestionIndex(questionIndex + 1);
      //   setSelectedOption('');
      // } else {
      //   setQuestionIndex(0);
      //   router.push({pathname: '/Pages/AssesmentOutro', params:{id}});
      // }
    }
  }

  return (
    <ScrollView style={styles.container} key={questionIndex}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#0C1C2C', '#285D92']} // Dark gradient background
        style={styles.headerBackground}
      >
      </LinearGradient>
      <View style={styles.questionCard} key={questionIndex}>
          <View>
            <Text>Module: {props.lessonDetail?.module?.title}</Text>
            <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, marginVertical: 10 }} />
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.questionText}>Question {questionIndex + 1}/{questions.length}</Text>
          </View>

        {/* Card for the Question */}
          <Text style={styles.question}>
            {questions[questionIndex]?.question}
          </Text>
        </View>
      <View style={styles.optionsContainer}>
        <Text style={{...styles.questionText, color: "black", marginBottom: 20}}>Choose the correct answer</Text>
        {questions[questionIndex]?.options.map(
          (option: any, index: any) => (
            <TouchableOpacity key={index} style={{...styles.option, ...(selectedOption === option ? {backgroundColor: "#FFF1EA", borderColor: "#F3661F"}: {})}} onPress={()=>setSelectedOption(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Next button */}
      <TouchableOpacity style={styles.nextButton} onPress={()=>nextQuiz()}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>nextQuiz(true)}>
        <Text style={{textAlign: 'center', color: '#FF7F00', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline', paddingBottom: 20}}>Save and Exit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerBackground: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    height: 200,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7F00', // Orange color for the question text
  },
  timer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 3,
    borderColor: '#FF7F00', // Orange border for the timer
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7F00', // Orange text inside the timer
  },
  questionCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 25,
    marginTop: -100, 
    marginBottom: 30,

  },
  question: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333', // Dark text for the question inside the card
    textAlign: 'center',
    marginVertical: 15,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#FF7F00', // Orange color for the Next button
    borderRadius: 8,
    alignItems: 'center',
    margin: 30,
    marginBottom: 5
  },
  nextButtonText: {
    padding: 15,
    fontSize: 18,
    color: '#FFF', // White text inside the Next button
    fontWeight: 'bold',
  },
});


const mapStateToProps = (state: any) => {
  return({
    lessonDetail: state.lessonDetail?.response,
    saveLessonProgressData: state.saveLessonProgress?.response,
  })
};

const mapDispatchToProps = (dispatch: any) => ({
  getLesson_: (lessonId: any) => dispatch(getLesson(lessonId)),
  saveLessonProgress_: (lessonId: any, data: any) => dispatch(saveLessonProgress(lessonId, data)),
  resetLessonProgress_: () => dispatch(resetLessonProgress()),
  disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);