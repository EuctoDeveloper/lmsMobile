import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import 'react-native-gesture-handler'; // This line is important
import { ThemedText } from '../ThemedText';
import { Divider, Modal } from 'react-native-paper';
import { connect } from 'react-redux';
import { disableAutoNavigate } from '../../store/action/common/courseAction';
import { router } from 'expo-router';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

interface QuestionAnswer {
  question: string;
  answer: string;
}
function QuestionAnswerComponent(props: any) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if(props.questionsAndAnswers && Array.isArray(props.questionsAndAnswers)){
      setQuestions(props.questionsAndAnswers);
    }
  }, [props.questionsAndAnswers]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      { questions && questions.length > 0 &&
        <InnerQuestionAnswerComponent {...props} questionsAndAnswers={questions} />
      }
    </GestureHandlerRootView>
  );
};
const getQaHeight = (q: any) => {
  const qHeight = (Math.ceil(q.question.length / 30) + 1) * 20;
  const aHeight = (Math.ceil(q.answer.length / 30) + 1) * 20;
  return Math.max(qHeight, aHeight);
}

const InnerQuestionAnswerComponent: React.FC = (props: any) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState(false);

  useEffect(() => {
    setModalVisible(true);
    if(props.questionsAndAnswers && Array.isArray(props.questionsAndAnswers)){
      let jumbledAnswers: any = props.questionsAndAnswers.map((qa: any) => qa.answer).sort(() => Math.random() - 0.5)
      setAnswers(jumbledAnswers);
    }
  }, []);

  const getAnsHeight = (index: any) => {
    const qHeight = (Math.ceil(props.questionsAndAnswers[index].question.length / 30) + 1) * 20;
    const aHeight = (Math.ceil(answers[index].length / 30) + 1) * 20;
    return Math.max(qHeight, aHeight);
  }
  const renderHintModal = () => (
    <Modal
      visible={modalVisible}
      onDismiss={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Instructions:</Text>
        <Text style={styles.modalText}>1. The left side contains the questions.</Text>
        <Text style={styles.modalText}>2. The right side contains the answers.</Text>
        <Text style={styles.modalText}>3. Drag and drop the answers to match them with the correct questions.</Text>
        <Text style={styles.modalText}>4. To move an item, press and drag it up or down.</Text>
        <Text style={styles.modalText}>5. Click the "Check Answers" button to see your results. Correct answers will be highlighted in green, and incorrect answers will be highlighted in red.</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<string>) => {
    return (
      <TouchableOpacity style={[styles.answerContainer, isActive && styles.activeAnswerContainer, {height: getAnsHeight(getIndex() ?? 0)}, checkAnswers ? {backgroundColor:item===props.questionsAndAnswers[getIndex() ?? 0].answer ? "green" : "red"}: null ]} onPressIn={drag}>
        <Text style={[styles.answerText, checkAnswers ? {color: "white"} : null]}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
      <View style={{flex: 1}}>
        <View style={{flexDirection:"row", width: "100%", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 5}}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>Match Correct Order</ThemedText>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <ThemedText style={{ fontSize: 12, textAlign:"right", color: "blue", borderBottomWidth: 1, borderBottomColor: 'blue'}}>Instruction</ThemedText>
          </TouchableOpacity>
        </View>
        <Divider style={{ marginVertical: 16, backgroundColor: "black"}} />
        <ScrollView style={{marginBottom: 20}}>
          <View style={styles.container}>
            <View style={styles.questionsContainer}>
              {props.questionsAndAnswers.map((qa: any, index: any) => (
                <View key={index} style={{...styles.questionContainer, height: getQaHeight(qa)}}>
                  <Text style={styles.questionText}>{qa.question}</Text>
                </View>
              ))}
            </View>
            <DraggableFlatList
              data={answers}
              renderItem={renderItem}
              keyExtractor={(item, index) => `draggable-item-${index}`}
              onDragEnd={({ data }) => setAnswers(data)}
            />
          </View>
        </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.startButton} onPress={()=>{setCheckAnswers(!checkAnswers)}}>
            <Text style={styles.startButtonText}>{checkAnswers ? "Hide Answers" : "Check Answers"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            router.push({
              pathname: '/Pages/Course', 
              params:{id: props.courseId, disableForcePush: 'true'}
            })
          }}
        >
            <Text style={styles.backText}>Back to Course</Text>
        </TouchableOpacity>
      </View>
      {renderHintModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  questionsContainer: {
    flex: 1,
    marginRight: 16,
  },
  questionContainer: {
    padding: 8,
    borderColor: 'black',
    marginBottom: 14,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    fontSize: 16,
  },
  answerContainer: {
    padding: 8,
    borderColor: 'black',
    marginBottom: 14,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeAnswerContainer: {
    backgroundColor: '#063e9e55',
  },
  answerText: {
    fontSize: 16,
  },
  answersList: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FF6C00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: '#FF0000',
    marginTop: 10,
    fontSize: 16,
  },
});



const mapStateToProps = (state: any) => ({
  lessonDetail: state.lessonDetail?.response,
});
  
const mapDispatchToProps = (dispatch: any) => ({
  disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswerComponent);