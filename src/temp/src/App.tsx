import {Button} from './components/ui/button'
import {Card} from './components/ui/card'
import {CardHeader} from './components/ui/card'
import {CardTitle} from './components/ui/card'
import {CardDescription} from './components/ui/card'
import {CardContent} from './components/ui/card'
import {Text} from './components/ui/text'
import {CardFooter} from './components/ui/card'

  function App() {
    return <div className="w-full h-full" id="ROOT" data-cy="root-container">
  <Button children="Button 1" style={{"backgroundColor":"#e50b0b","fontSize":"48px","paddingBotton":"10px","paddingTop":"10px","marginTop":"5px","marginRight":"5px","marginLeft":"5px","width":"500px","fontWeight":"900","textAlign":"start","fontStyle":"italic","height":"70px"}} />
  <Button children="Button 2" />
  <Button children="Button 3" />
  <Button children="Button 4" />
  <Card className="p-6 m-2" style={{"backgroundColor":"#000000"}}>
    <CardHeader >
      <CardTitle children="Card Title" style={{"color":"#ff0000","fontSize":"32px","lineHeight":"70px","textTransform":"uppercase","textAlign":"center"}} />
      <CardDescription children="Card Description" />
    </CardHeader>
    <CardContent >
      <Text tagName="p" children="Paragraph" style={{"color":"#ffffff","fontSize":"32"}} />
    </CardContent>
    <CardFooter >
      <Button children="Footer button" />
    </CardFooter>
  </Card>
</div>
  }

  export default App;