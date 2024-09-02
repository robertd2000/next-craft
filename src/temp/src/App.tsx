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
  <Button children="Button 1" />
  <Button children="Button 2" />
  <Button children="Button 3" />
  <Button children="Button 4" />
  <Card className="p-6 m-2 bg-red-900">
    <CardHeader >
      <CardTitle children="Card Title" />
      <CardDescription children="Card Description" />
    </CardHeader>
    <CardContent >
      <Text tagName="h2" children="Title" />
      <Text tagName="p" children="Paragraph" />
      <div className="p-6 m-2">
        <CardContent >
          <Button variant="destructive" children="Destructive" className="bg-green-300" />
          <Button variant="destructive" children="Destructive" />
        </CardContent>
      </div>
    </CardContent>
    <CardFooter >
      <Button children="Footer button" />
    </CardFooter>
  </Card>
  <Button variant="outline" children="Outline" />
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
  }

  export default App;