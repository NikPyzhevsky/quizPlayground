import ApplicationContextProvider from '../packages/shared/context/ApplicationContext';
import WizardScreen from './screens/Wizard';
import {initApplicationContext} from './config/init';

const {  services } = initApplicationContext();


const App = () => {
    return(
        <ApplicationContextProvider services={services}>
            <WizardScreen/>
        </ApplicationContextProvider>

    );
};

export default App;
