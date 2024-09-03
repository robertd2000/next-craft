import {Button} from './components/ui/button'
import {Text} from './components/ui/text'
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
  <Button children="Button 4" style={{"backgroundColor":"#f31e1e"}} />
  <div >
    <div className="p-6 m-2" style={{"backgroundColor":"#601616"}}>
      <Text tagName="p" children="Paragraph" />
      <Card className="p-6 m-2">
        <CardHeader >
          <CardTitle children="Card Title" />
          <CardDescription children="Card Description" />
        </CardHeader>
        <CardContent  />
        <CardFooter >
          <Button children="Footer button" />
        </CardFooter>
      </Card>
    </div>
  </div>
</div>
  }

  export default App;