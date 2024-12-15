import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, home, square, triangle } from 'ionicons/icons';
import HomePage from './pages/Home/Home';
import FavoritesPage from './pages/Favorites/Favorites';
import * as TEXT from './utils/text';
import * as ROUTES from './utils/routes';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import CategoryPage from './pages/Category/Category';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={ROUTES.ROUTES_HOME}>
            <HomePage />
          </Route>
          <Route exact path={ROUTES.ROUTES_FAVORITES}>
            <FavoritesPage />
          </Route>
          <Route exact path={ROUTES.ROUTES_CATEGORY_ID}>
            <CategoryPage />
          </Route>
          <Route exact path="/">
            <Redirect to={ROUTES.ROUTES_HOME} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href={ROUTES.ROUTES_HOME}>
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>{TEXT.MENU_HOME}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href={ROUTES.ROUTES_FAVORITES}>
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
