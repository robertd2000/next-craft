import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="w-full h-full" id="ROOT" data-cy="root-container">
      <Button children="Button 1" />
      <Button children="Button 2" />
      <Button
        children="Button 3"
        style={{
          marginTop: "45px",
          marginBottom: "",
          marginLeft: "",
          marginRight: "",
          paddingTop: "",
          paddingBottom: "",
          paddingLeft: "",
          paddingRight: "",
          width: "140px",
          height: "",
          minWidth: "",
          minHeight: "",
          maxWidth: "",
          maxHeight: "",
          fontSize: "",
          lineHeight: "",
          letterSpacing: "",
          color: "#ff0505",
        }}
      />
      <Button children="Button 4" />
    </div>
  );
}

export default App;
