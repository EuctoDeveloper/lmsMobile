import { disableAutoNavigate, getLesson } from '@/store/action/common/courseAction';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import Layout from "@/components/Layout/Layout"


const AssessmentOutro = (props: any) => {
    const {id} = useLocalSearchParams();
    const [lessonDetail, setLessonDetail] = useState<any>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        getName();
        props.getLesson_(id);
    },[]);
    useEffect(()=>{
        if(props.lessonDetail){
            setLessonDetail(props.lessonDetail);
        }
    }, [props.lessonDetail]);
  const getName = async () => {
    const fName = await SecureStore.getItemAsync('firstName') || props.login.userData.firstName;
    const lName = await SecureStore.getItemAsync('lastName') || props.login.userData.lastName;
    if (fName || lName) {
      setName(fName + ' ' + lName);
    }
  };
  return (
      <ImageBackground source={require('../../assets/images/assesBg.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
        <Layout>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.moduleText}>Modulew - {props.lessonDetail?.module?.title}</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>Congratulation {name}  🎉</Text>
                <Text style={styles.statusInfo}>You have completed {props.lessonDetail?.module?.title} assessment</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.lightHeading}>Assessment</Text>
                <View style={styles.greyContainer}>
                  <Text style={{marginBottom: 20}}>Assesment Type: MCQ</Text>
                  <Text style={{marginBottom: 20}}>No:of Questions: {lessonDetail?.questions?.length}</Text>
                  <Text>Score: {lessonDetail?.score}/{lessonDetail?.totalGrade}</Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.lightHeading}>Revision Summary</Text>
                <View style={styles.greyContainer}>
                  <Text style={{fontSize: 12}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus fugit, illo doloribus placeat possimus tempora aliquid officia eaque, assumenda molestiae earum voluptates sequi culpa. Recusandae veniam inventore sapiente error sit</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.nextButton} onPress={()=>
                {
                  props.disableAutoNavigate_();
                  router.push({pathname: '/Pages/Course', params:{id: lessonDetail.courseId, disableForcePush: "true"}})}
                }
              >
                <Text style={styles.nextButtonText}> {!lessonDetail?.isLastModule ? 'Next Module' : 'Back to course'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Layout>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  moduleText: {
    marginTop: Platform.OS === "ios" ? 40 : 40,
    fontSize: 18,
    marginBottom: 10,
  },
  statusContainer: {
    borderColor: "#006800",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "95%",
    backgroundColor: "#EFFFEC",
  },
  status: {
    textAlign: "center",
    color: "#006800",
    fontWeight: "bold"
  },
  lightHeading: {
    color: "#737373",
    fontSize: 13,
    textAlign: "left",
    marginLeft: 10,
    marginVertical: 10,
  },
  greyContainer: {
    backgroundColor: "#F4F4F4",
    marginHorizontal:30,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  statusInfo: {
    fontSize: 13,
    textAlign: "center",
    color: "#006800",
    fontWeight: "light",
    marginTop: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: Platform.OS === "ios" ? 100: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 10
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 10,
  },
  thankYou: {
    fontSize: 16,
    marginTop: 20,
    color: 'gray',
  },
  viewResult: {
    color: "blue",
    textDecorationLine: "underline",
  },
  nextButton: {
    backgroundColor: '#354CDF', // Orange color for the Next button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#FFF', // White text inside the Next button
    fontWeight: 'bold',
  },
});



const mapStateToProps = (state: any) => ({
    lessonDetail: state.lessonDetail?.response,
  });
  
  const mapDispatchToProps = (dispatch: any) => ({
    getLesson_: (lessonId: any) => dispatch(getLesson(lessonId)),
    disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
    
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentOutro);
