import React, {FC, MutableRefObject, PropsWithChildren, useEffect, useRef, useState} from 'react';
import WebHelpDeskContext from './context/WebHelpDeskContext';
import {SafeAreaView} from 'react-native';
import {AbsoluteWebHelpDeskConfig, ModalWebHelpDeskConfig, WebHelpDesk, WebHelpDeskConfig} from './types';
import {WEB_HELP_DESK_INITIAL_VALUE} from './const';
import WebView from 'react-native-webview';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ModalWebHelpDesk from './components/ModalWebHelpDesk';
import AbsoluteWebHelpDesk from './components/AbsoluteWebHelpDesk';

const WebHelpDeskProvider: FC<WebHelpDeskConfig> = (props: PropsWithChildren<WebHelpDeskConfig>) => {
    const [webHelpDeskContextValue, setWebHelpDeskContextValue] = useState(WEB_HELP_DESK_INITIAL_VALUE);
    const webViewRef: MutableRefObject<WebView | null> = useRef<WebView>(null);

    useEffect(() => {
        if (webViewRef.current?.injectJavaScript) {
            setWebHelpDeskContextValue((prev: WebHelpDesk) => ({
                ...prev,
                injectJavaScript: webViewRef.current?.injectJavaScript
            }));
        }
    }, [webViewRef.current?.injectJavaScript]);

    return (
        <SafeAreaProvider>
            <WebHelpDeskContext.Provider value={webHelpDeskContextValue}>
                {props.children}
                {
                    (props.useModal ?? true) ? (
                        <SafeAreaView>
                            <ModalWebHelpDesk
                                setWebHelpDeskContextValue={setWebHelpDeskContextValue}
                                webViewRef={webViewRef}
                                {...(props as ModalWebHelpDeskConfig)}
                            />
                        </SafeAreaView>
                    ) : (
                        <AbsoluteWebHelpDesk
                            setWebHelpDeskContextValue={setWebHelpDeskContextValue}
                            webViewRef={webViewRef}
                            {...(props as unknown as AbsoluteWebHelpDeskConfig)}
                        />
                    )
                }
            </WebHelpDeskContext.Provider>
        </SafeAreaProvider>
    );
};

export default WebHelpDeskProvider;
