import React, { Component, Suspense } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { observer } from "mobx-react";
import RootStore from "./stores/RootStore";
import { RawIntlProvider } from "react-intl";
import Spinner from "./components/Spinner/Spinner";
import Routers from "./Routes";
import Modals from "./components/Modals/Modals";
import {ToastContainer} from "react-toastify";

@observer
class App extends Component {
  async componentDidMount() {
    await RootStore.init();
  }

  render() {
    const { localization, isLoading } = RootStore;
    return isLoading ? (
      <Spinner />
    ) : (
      <RawIntlProvider value={localization?.intl}>
        {
          RootStore.isServerError ?
              <div>500</div> :
              <div className="App">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnHover
                />
                <Modals />
                <BrowserRouter>
                  <Navigation />
                  <Suspense fallback={<Spinner />}>
                    <Routers />
                  </Suspense>
                </BrowserRouter>
              </div>
        }
      </RawIntlProvider>
    );
  }
}

export default App;
