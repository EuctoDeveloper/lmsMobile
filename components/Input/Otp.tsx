import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
    length: number;
    onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        onChange(otp.join(''));
    }, [otp, onChange]);

    const handleChange = (e: any, index: number) => {
        const value = e;
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('Text').slice(0, length);
        if (/^\d*$/.test(pasteData)) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            inputsRef.current[newOtp.length - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((digit, index) => (
            <TextInput
                key={index}
                value={digit}
                onChangeText={(e: any) => handleChange(e, index)}
                ref={(el: any) => (inputsRef.current[index] = el!)}
                maxLength={1}
                keyboardType="numeric"
                style={styles.input}
            />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#000',
        width: 40,
        textAlign: 'center',
    },
});


export default OtpInput;