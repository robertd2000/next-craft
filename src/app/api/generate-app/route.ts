import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { NextResponse } from "next/server";

const componentMap = {
  Card: "Card",
  Button: "Button",
  // Добавьте сюда другие компоненты, если они используются
};

function createComponent(node) {
  const { type, props, children } = node;
  const Component = componentMap[type] || type;

  let childrenCode = "";
  if (children && children.length > 0) {
    childrenCode = children.map((child) => createComponent(child)).join("");
  }

  const propsCode = Object.entries(props || {})
    .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
    .join(" ");

  return `<${Component} ${propsCode}>${childrenCode}</${Component}>`;
}

export async function POST(request) {
  const { appStructure } = await request.json();

  if (!appStructure) {
    return NextResponse.json(
      { error: "No structure provided" },
      { status: 400 }
    );
  }

  const tempDir = path.join(process.cwd(), "temp");
  await fsPromises.mkdir(tempDir, { recursive: true });

  // Создаем структуру компонента
  const componentCode = createComponent(appStructure);
  const appJsContent = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Header from '../components/Header';
    import Card from '../components/Card';
    import Button from '../components/Button';

    const App = () => (
      ${componentCode}
    );

    ReactDOM.render(<App />, document.getElementById('root'));
  `;

  // Сохранение App.js
  const appJsPath = path.join(tempDir, "src", "App.js");
  fs.mkdirSync(path.join(tempDir, "src"), { recursive: true });
  fs.writeFileSync(appJsPath, appJsContent);

  // Создание package.json
  const packageJsonContent = {
    name: "temp-app",
    version: "1.0.0",
    private: true,
    dependencies: {
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test",
      eject: "react-scripts eject",
    },
  };
  const packageJsonPath = path.join(tempDir, "package.json");
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJsonContent, null, 2)
  );

  // Создание index.js
  const indexJsContent = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  `;
  const indexJsPath = path.join(tempDir, "src", "index.js");
  fs.writeFileSync(indexJsPath, indexJsContent);

  // Создание index.html
  const indexHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Temp App</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
    </html>
  `;
  const indexHtmlPath = path.join(tempDir, "public", "index.html");
  fs.mkdirSync(path.join(tempDir, "public"), { recursive: true });
  fs.writeFileSync(indexHtmlPath, indexHtmlContent);

  // Установка зависимостей
  exec(`npm install`, { cwd: tempDir }, (err, stdout, stderr) => {
    if (err) {
      console.error("Failed to install dependencies:", stderr);
      return NextResponse.json(
        { error: "Failed to install dependencies", details: stderr },
        { status: 500 }
      );
    }

    console.log("Dependencies installed successfully:", stdout);
    return NextResponse.json(
      { message: "App generated successfully", path: tempDir },
      { status: 200 }
    );
  });

  return NextResponse.json(
    { message: "App is being generated", path: tempDir },
    { status: 200 }
  );
}
