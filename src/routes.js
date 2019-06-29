import { createAppContainer } from 'react-navigation';

import SwitchNavigator from './navigation/SwitchNavigator';

const Routes = createAppContainer(SwitchNavigator);

export default Routes;