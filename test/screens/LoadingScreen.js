import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function LoadingScreen() {
    return (
        <ActivityIndicator animating={true} color={Colors.red800} />
    )
}