
  import {Button} from './components/ui/button'
import {CardTitle} from './components/ui/card'
import {Card} from './components/ui/card'
import {CardHeader} from './components/ui/card'
import {CardDescription} from './components/ui/card'
import {CardContent} from './components/ui/card'
import {Text} from './components/ui/text'
import {CardFooter} from './components/ui/card'

  function App() {
    return <div className="w-full h-full" id="ROOT" data-cy="root-container">
  <Button children="Button 1" />
  <Button children="Button 2" />
  <Button children="Button 3" />
  <Button children="Button 4" />
  <CardTitle children="Card Title" />
  <div >
    <div className="p-6 m-2" style={{"display":"flex"}}>
      <Card className="p-6 m-2" style={{"width":"50%"}}>
        <CardHeader >
          <CardTitle children="Card Title" />
          <CardDescription children="Card Description" />
        </CardHeader>
        <CardContent >
          <Text tagName="p" children="Paragraph" />
        </CardContent>
        <CardFooter >
          <Button children="Footer button" />
        </CardFooter>
      </Card>
      <Card className="p-6 m-2" style={{"position":"static","width":"50%","fontWeight":"300","backgroundColor":"#1e0000"}}>
        <CardHeader >
          <Text tagName="h2" children="Title" style={{"color":"#9b0d0d","fontStyle":"italic","textTransform":"uppercase","fontWeight":"100","fontSize":"24"}} />
        </CardHeader>
        <CardContent >
          <Button children="Default" style={{"backgroundColor":"#e50bc8"}} />
        </CardContent>
        <CardFooter >
          <Button children="Footer button" style={{"color":"#ffffff","backgroundColor":"#a80000"}} />
        </CardFooter>
      </Card>
    </div>
  </div>
  <div >
    <div className="p-6 m-2" />
  </div>
</div>
  }

  export default App;
