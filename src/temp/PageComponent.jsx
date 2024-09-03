
  import {Button} from './components/ui/button'
import {Card} from './components/ui/card'
import {CardHeader} from './components/ui/card'
import {CardTitle} from './components/ui/card'
import {CardDescription} from './components/ui/card'
import {CardContent} from './components/ui/card'
import {CardFooter} from './components/ui/card'

  function App() {
    return <div className="w-full h-full" id="ROOT" data-cy="root-container">
  <Button children="Button 1" style={{"marginTop":"10","marginLeft":"50","marginRight":"26"}} />
  <Button children="Button 2" />
  <Button children="Button 3" />
  <Button children="Button 4" style={{"backgroundColor":"#760e0e"}} />
  <div >
    <div className="p-6 m-2" />
  </div>
  <Card className="p-6 m-2" style={{"backgroundColor":"#06ecb5"}}>
    <CardHeader >
      <CardTitle children="Card Title" style={{"fontWeight":"800","color":"#ffffff","fontSize":"32"}} />
      <CardDescription children="Card Description" />
    </CardHeader>
    <CardContent >
      <div >
        <div className="p-6 m-2" style={{"display":"flex","backgroundColor":"#09e1ff"}}>
          <Card className="p-6 m-2" style={{"backgroundColor":"#eb13bb"}}>
            <CardHeader >
              <CardTitle children="Card Title" />
              <CardDescription children="Card Description" />
            </CardHeader>
            <CardContent  />
            <CardFooter >
              <Button children="Footer button" />
            </CardFooter>
          </Card>
          <Card className="p-6 m-2" style={{"backgroundColor":"#ff0000"}}>
            <CardHeader >
              <CardTitle children="Card Title" />
              <CardDescription children="Card Description" />
            </CardHeader>
            <CardContent  />
            <CardFooter >
              <Button children="Footer button" />
            </CardFooter>
          </Card>
          <Card className="p-6 m-2" style={{"backgroundColor":"#1e0000","marginLeft":"50"}}>
            <CardHeader >
              <CardTitle children="Card Title" style={{"color":"#e91111","backgroundColor":"#ffffff"}} />
              <CardDescription children="Card Description" />
            </CardHeader>
            <CardContent  />
            <CardFooter >
              <Button children="Footer button" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </CardContent>
    <CardFooter >
      <Button children="Footer button" />
    </CardFooter>
  </Card>
</div>
  }

  export default App;
