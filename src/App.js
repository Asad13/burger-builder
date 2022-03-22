import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainComponent from './components/MainComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
