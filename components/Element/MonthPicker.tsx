import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import MonthSelectorCalendar from 'react-native-month-selector';
import moment from 'moment';

const MonthPicker = (props: any) => {
  const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth || moment());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  return (
    <View style={styles.container}>
      {/* Month Picker Button */}
      <TouchableOpacity onPress={() => setShowMonthPicker(true)} style={styles.button}>
        <Text style={styles.monthText}>
          {selectedMonth.format('MMMM YYYY')}
        </Text>
      </TouchableOpacity>

      {/* Month Picker Modal */}
      <Modal visible={showMonthPicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
            <MonthSelectorCalendar
              selectedDate={selectedMonth}
              maxDate={moment().add(10, 'years')}
              onMonthTapped={(date) => {
                setSelectedMonth(date);
                setShowMonthPicker(false);
                props.changeMonth(date);
              }}
              selectedBackgroundColor="#FF6600"
              selectedTextColor="#fff"
            />
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
});

export default MonthPicker;
