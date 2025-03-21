import { disableAutoNavigate } from '../../store/action/common/courseAction';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { connect } from 'react-redux';
import { Divider, Modal } from 'react-native-paper';
import { ThemedText } from '../ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons'; // For check/close icons


function CardSwiper(props: any) {
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [cards, setCards] = useState([]);
  const swiperRef = useRef<any>(null);

  // Track whether the user has finished all cards
  const [isDeckFinished, setIsDeckFinished] = useState(false);

  // State and animation for icon feedback
  const [iconName, setIconName] = useState<string>('checkmark-circle');
  const [iconColor, setIconColor] = useState<string>('green');
  const iconAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setModalVisible(true);
    setCards(props.cards);
    console.log(props.cards);
  },[]);

  /**
   * Show icon with animation
   * @param isCorrect
   */
  const showIconFeedback = (isCorrect: boolean) => {
    if (isCorrect) {
      setIconName('checkmark-circle');
      setIconColor('green');
    } else {
      setIconName('close-circle');
      setIconColor('red');
    }

    Animated.sequence([
      // Fade icon in
      Animated.timing(iconAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      // Wait visible for 500ms
      Animated.delay(500),
      // Fade icon out
      Animated.timing(iconAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * Called when user swipes the card
   */
  const handleSwipe = (cardIndex: number, direction: 'left' | 'right') => {
    const currentItem = cards[cardIndex];

    // If user swipes right
    if (direction === 'right') {
      if (currentItem.answer === 'true') {
        setCorrectAnswer((prev) => prev + 1);
        showIconFeedback(true);
      } else {
        showIconFeedback(false);
      }
    }

    // If user swipes left
    else if (direction === 'left') {
      if (currentItem.answer === 'false') {
        setCorrectAnswer((prev) => prev + 1);
        showIconFeedback(true);
      } else {
        showIconFeedback(false);
      }
    }
  };

  /**
   * Modal with instructions
   */
  const renderHintModal = () => (
    <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Instructions:</Text>
        <Text style={styles.modalText}>1. Each card presents a question.</Text>
        <Text style={styles.modalText}>
          2. Determine if the statement on the card is correct or incorrect.
        </Text>
        <Text style={styles.modalText}>
          3. Swipe the card right if the statement is correct, and left if it is incorrect.
        </Text>
        <Text style={styles.modalText}>
          4. The count of correct answers will be displayed below.
        </Text>
        <Text style={styles.modalText}>
          5. Press the reset button to start over.
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  /**
   * Resets correctAnswer count and repositions swiper to first card
   */
  const resetGame = () => {
    setCorrectAnswer(0);
    setIsDeckFinished(false);
    swiperRef.current?.jumpToCardIndex(0);
  };

  return (
    <>
      {/* Top Header */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }}>
          Swipe to right choice
        </ThemedText>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <ThemedText
            style={{
              fontSize: 12,
              textAlign: 'right',
              color: 'blue',
              borderBottomWidth: 1,
              borderBottomColor: 'blue',
            }}
          >
            Instruction
          </ThemedText>
        </TouchableOpacity>
      </View>

      <Divider style={{ marginVertical: 16, backgroundColor: 'black' }} />

      {/* Main Container */}
      { cards && cards.length > 0 && (
        <View style={styles.container}>
          <Swiper
            ref={swiperRef}
            cards={cards}
            backgroundColor="transparent"
            renderCard={(card) => (
              <View style={styles.card}>
                <Text style={styles.text}>{card.question}</Text>
              </View>
            )}
            onSwipedRight={(index) => handleSwipe(index, 'right')}
            onSwipedLeft={(index) => handleSwipe(index, 'left')}
            onSwipedAll={() => setIsDeckFinished(true)}
          />
          {/* Icon Feedback (check or close) */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.iconFeedbackContainer,
              {
                opacity: iconAnim,
              },
            ]}
          >
            <Ionicons name={iconName} size={72} color={iconColor} />
          </Animated.View>

          {/* Bottom Controls */}
          <View style={styles.buttonsContainer}>
            {/* If the deck is finished, display a special "Thank you" message */}
            {isDeckFinished && (
              <Text style={styles.completedText}>
                Thank you for participating! Check the score below. 
                Click "Reset" to play again.
              </Text>
            )}

            <Text style={styles.summary}>Correct Answers: {correctAnswer}</Text>

            <TouchableOpacity style={styles.startButton} onPress={resetGame}>
              <Text style={styles.startButtonText}>{'Reset'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: '/Pages/Course',
                  params: { id: props.courseId, disableForcePush: 'true' },
                });
              }}
            >
              <Text style={styles.backText}>Back to Course</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {renderHintModal()}
    </>
  );
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  text: { fontSize: 24 },
  summary: { marginTop: 40, marginBottom: 10, fontSize: 18 },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FF6C00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginVertical: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: '#FF0000',
    marginTop: 5,
    fontSize: 16,
  },

  // Icon feedback container (for the tick or wrong icon)
  iconFeedbackContainer: {
    position: 'absolute',
    bottom: 140, // adjust to your liking
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  // Text shown when the deck is finished
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 200,
    textAlign: 'center',
    color: '#4B5563', // a nice dark gray
    paddingHorizontal: 75,
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
  button: { borderRadius: 20, padding: 10, elevation: 2 },
  buttonClose: { backgroundColor: '#2196F3' },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: { marginBottom: 15, textAlign: 'center' },
});

const mapStateToProps = (state: any) => ({
  lessonDetail: state.lessonDetail?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  disableAutoNavigate_: () => dispatch(disableAutoNavigate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSwiper);