import './App.css';
import Header from './components/Header';
import Addtodo from './components/Addtodo';
import Showarchivedtodo from './components/Showarchivedtodo';
import Todos from './components/Todos';
import {Provider} from './context';

function App() {
  return (
    <Provider>
      <div className='app-container'>
        <Header></Header>
        <Showarchivedtodo></Showarchivedtodo>
        <Addtodo></Addtodo>
        <Todos></Todos>
      </div>
    </Provider>
  );
}

export default App;
