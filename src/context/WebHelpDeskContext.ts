import {createContext} from 'react';
import {WebHelpDesk} from '../types';
import {WEB_HELP_DESK_INITIAL_VALUE} from '../const';

const WebHelpDeskContext = createContext<WebHelpDesk>(WEB_HELP_DESK_INITIAL_VALUE);

export default WebHelpDeskContext;
