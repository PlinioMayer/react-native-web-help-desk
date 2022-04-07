import React, {FC, PropsWithChildren, useCallback, useEffect} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {ModaleWebHelpDeskComponentProps, WebHelpDesk} from '../types';
import useWebHelpDesk from '../hooks/use-web-help-desk';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    zeroAbsolutePosition: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const ModalWebHelpDesk: FC<ModaleWebHelpDeskComponentProps> = (props: PropsWithChildren<ModaleWebHelpDeskComponentProps>) => {
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
    }, [props.setWebHelpDeskContextValue]);

    const close = useCallback(() => {
        props.setWebHelpDeskContextValue((prevState: WebHelpDesk) => ({
            ...prevState,
            isOpened: false
        }));
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={webHelpDesk.isOpened}
            onRequestClose={close}
            {...props.modalProps}
        >
            <View
                style={[styles.container, (props.activityIndicatorEnabled ?? true)  ? styles.centered : {}]}>
                {
                    (props.activityIndicatorEnabled ?? true) &&
                    <ActivityIndicator color="blue" size="large" {...props.activityIndicatorProps} />
                }

                <WebView
                    ref={props.webViewRef}
                    style={{backgroundColor: 'transparent'}}
                    containerStyle={styles.zeroAbsolutePosition}
                    source={{uri: props.uri}}
                    allowFileAccess
                    onMessage={onMessage}
                    onLoadEnd={onLoadEnd}
                    {...props.webViewProps}
                />


            </View>
        </Modal>
    );
};

export default ModalWebHelpDesk;