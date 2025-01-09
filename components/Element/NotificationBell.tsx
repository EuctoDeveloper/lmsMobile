import React from 'react';
                import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
                import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

                enum Mode {
                    light = 'light',
                    dark = 'dark'
                }

                interface NotificationBellProps {
                    count: number;
                    mode: string;
                    hideBellIcon?: boolean;
                }

                const NotificationBell: React.FC<NotificationBellProps> = ({ count, mode, hideBellIcon }) => {
                    return (
                        <TouchableOpacity style={styles.container} onPress={()=>router.push("/Pages/NotificationList")}>
                            {!hideBellIcon &&
                            <>
                                <FontAwesome name="bell" size={22} color={mode==="dark"? "black": "white"} />
                                { count > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{count > 9 ? "9+" : count}</Text>
                                    </View>
                                )}
                                </>
                            }
                        </TouchableOpacity>
                    );
                };

                const styles = StyleSheet.create({
                    container: {
                        position: 'relative',
                        display: 'flex',
                    },
                    badge: {
                        position: 'absolute',
                        top: -5,
                        right: -7,
                        backgroundColor: 'red',
                        borderRadius: 50,
                        paddingVertical: 2,
                    },
                    badgeText: {
                        color: 'white',
                        fontSize: 10,
                        fontWeight: 'bold',
                        paddingHorizontal: Platform.OS === "ios" ? 3:5
                    },
                });

                export default NotificationBell;