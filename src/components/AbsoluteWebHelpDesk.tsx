import React, {FC, PropsWithChildren, useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useWebHelpDesk from '../hooks/use-web-help-desk';
import {AbsoluteWebHelpDeskComponentProps, WebHelpDesk} from '../types';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden'
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const AbsoluteWebHelpDesk: FC<AbsoluteWebHelpDeskComponentProps> = (props: PropsWithChildren<AbsoluteWebHelpDeskComponentProps>) => {
    const insets = useSafeAreaInsets();
    const webHelpDesk = useWebHelpDesk();

    const onLoadEnd = useCallback(() => {
        if (props.initScript) {
            props.webViewRef.current?.injectJavaScript(props.initScript);
        }

        props.setWebHelpDeskContextValue((prevState: WebHelpDesk) => ({
            ...prevState,
            webViewLoaded: true
        }));
    }, [props.initScript, props.webViewRef.current, props.setWebHelpDeskContextValue]);

    const open = useCallback(() => {
        props.setWebHelpDeskContextValue((prevState: WebHelpDesk) => ({
            ...prevState,
            isOpened: true
        }));

        if (props.openScript) {
            props.webViewRef.current?.injectJavaScript(props.openScript);
        }

    }, [props.setWebHelpDeskContextValue]);

    const close = useCallback(() => {
        props.setWebHelpDeskContextValue((prevState: WebHelpDesk) => ({
            ...prevState,
            isOpened: false
        }));

        if (props.closeScript) {
            props.webViewRef.current?.injectJavaScript(props.closeScript);
        }
    }, [props.setWebHelpDeskContextValue]);

    const onMessage = useCallback((webViewMessageEvent: WebViewMessageEvent) => {
        if (webViewMessageEvent.nativeEvent.data === 'close') {
            close();
        }
    }, [close]);


    useEffect(() => {
        props.setWebHelpDeskContextValue((prev: WebHelpDesk) => ({
            ...prev,
            open,
            close,
            ready: true
        }));
    }, [props.setWebHelpDeskContextValue]);

    return (
        <View
            style={[
                styles.container,
                (props.activityIndicatorEnabled ?? true) ? styles.centered : {},
                (webHelpDesk.isOpened ? {} : { height: 0 })
            ]}>
            {
                (props.activityIndicatorEnabled ?? true) &&
                <ActivityIndicator color="blue" size="large" {...props.activityIndicatorProps} />
            }

            <WebView
                ref={props.webViewRef}
                style={{backgroundColor: 'transparent'}}
                containerStyle={{position: 'absolute', ...insets}}
                source={{uri: props.uri}}
                allowFileAccess
                onMessage={onMessage}
                onLoadEnd={onLoadEnd}
                {...props.webViewProps}
            />

        </View>
    );
};

export default AbsoluteWebHelpDesk;