import './App.scss';
import ColorForm from './components/ColorForm';
import { ColorsList } from './components/ColorsList';
import FilterColor from './components/FilterColor';

function App() {
  return (
    <div className="App">
      <ColorForm />
      <FilterColor />
      <ColorsList />
    </div>
  );
}

export default App;
