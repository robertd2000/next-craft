import {Button} from './components/ui/button'

  function App() {
    return <div className="w-full h-full" id="ROOT" data-cy="root-container">
  <Button children="Button 1" />
  <Button children="Button 2" />
  <Button children="Button 3" />
  <Button children="Button 4" style={{"marginTop":"200px","width":"500px"}} />
</div>
  }

  export default App;