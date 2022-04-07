import {useContext} from 'react';
import WebHelpDeskContext from '../context/WebHelpDeskContext';

const useWebHelpDesk = () => useContext(WebHelpDeskContext);

export default useWebHelpDesk;