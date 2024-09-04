import {Button} from './components/ui/button'
import {Card} from './components/ui/card'
import {CardHeader} from './components/ui/card'
import {CardTitle} from './components/ui/card'
import {CardDescription} from './components/ui/card'
import {CardContent} from './components/ui/card'
import {CardFooter} from './components/ui/card'

  function App() {
    return <div className="w-full h-full" id="ROOT" data-cy="root-container">
  <Button children="Button 1" />
  <Button children="Button 2" />
  <Button children="Button 3" />
  <Button children="Button 4" />
  <Card className="p-6 m-2" style={{"borderStyle":"dashed","borderColor":"#11d800"}}>
    <CardHeader >
      <CardTitle children="Card Title" />
      <CardDescription children="Card Description" />
    </CardHeader>
    <CardContent  />
    <CardFooter >
      <Button children="Footer button" style={{"borderColor":"#ff0505","borderStyle":"solid","borderTopWidth":"12px","borderBottomWidth":"12px","borderLeftWidth":"12px","borderRightWidth":"12px"}} />
    </CardFooter>
  </Card>
</div>
  }

  export default App;