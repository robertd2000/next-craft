import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";

import path from "path";
import { exec, execSync } from "child_process";
import archiver from "archiver";

type ResponseData = any;

export const GET = async (req: Request, res: NextApiResponse<ResponseData>) => {
  return res.status(200).json({ error: "Ошибка сборки" });
};

export const POST = async (
  req: Request,
  res: NextApiResponse<ResponseData>
) => {
  // res.status(200).send(await fs.readFile(zipPath));
  //   if (req.method === "POST") {
  const body = await req.json();
  const { componentCode, componentName } = body;

  console.log("componentName", componentName);

  if (!componentName) {
    return new Response("Build error", { status: 400 });
  }

  // Путь к директории с проектом
  const projectDir = path.resolve(
    process.cwd(),
    "src/components",
    componentName
  );
  console.log("projectDir", projectDir);
  execSync("npm run build", { cwd: projectDir });

  // Выполнение команды npm run build
  //   exec(
  //     '"C:\\Windows\\System32\\cmd.exe" /c npm run build',
  //     { cwd: projectDir },
  //     async (err, stdout, stderr) => {
  //       if (err) {
  //         console.error("Build error:", stderr, err);
  //         return new Response("Build error", { status: 500 });
  //       }

  //       console.log("Build output:", stdout);

  //       // Создание архива с продакшн-билдом
  //       const file = await fs.open(`${componentName}.zip`);
  //       let output = file.createWriteStream();
  //       const archive = archiver("zip", {
  //         zlib: { level: 9 }, // Уровень сжатия
  //       });

  //       output.on("close", () => {
  //         console.log(archive.pointer() + " total bytes");
  //         console.log(
  //           "Archiver has been finalized and the output file descriptor has closed."
  //         );

  //         // Отправка архива клиенту
  //         res.setHeader("Content-Type", "application/zip");
  //         res.setHeader(
  //           "Content-Disposition",
  //           `attachment; filename="${componentName}.zip"`
  //         );
  //         fs.createReadStream(`${componentName}.zip`).pipe(res);
  //       });

  //       archive.on("error", (err) => {
  //         console.error("Archiving error:", err);
  //         return new Response("Build error", { status: 500 });
  //       });

  //       // Архивируем содержимое папки с билдом
  //       archive.directory(path.join(projectDir, "out"), false);

  //       // Финализируем архив
  //       archive.pipe(output);
  //       archive.finalize();
  //     }
  //   );
  //     console.log("componentName", componentName);

  //   if (!componentCode || !componentName) {
  //     return res
  //       .status(400)
  //       .json({ error: "Отсутствует код компонента или имя" });
  //   }

  //   // Путь к временной директории для сборки компонента
  //   const buildDir = path.resolve(process.cwd(), "temp_build", componentName);
  //   await fs.mkdir(buildDir, { recursive: true });

  //   // Создаем файл с кодом компонента
  //   const componentPath = path.join(buildDir, `${componentName}.js`);
  //   await fs.writeFile(componentPath, componentCode);

  //   // Создаем entry-файл для сборки компонента
  //   const entryCode = `
  //       import React from 'react';
  //       import ReactDOM from 'react-dom';
  //       import ${componentName} from './${componentName}.js';

  //       ReactDOM.render(<${componentName} />, document.getElementById('root'));
  //     `;
  //   const entryPath = path.join(buildDir, "index.js");
  //   await fs.writeFile(entryPath, entryCode);

  //   // Создаем HTML-файл для сборки
  //   const htmlCode = `
  //       <!DOCTYPE html>
  //       <html lang="en">
  //       <head>
  //         <meta charset="UTF-8">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>${componentName}</title>
  //       </head>
  //       <body>
  //         <div id="root"></div>
  //         <script src="index.js"></script>
  //       </body>
  //       </html>
  //     `;
  //   const htmlPath = path.join(buildDir, "index.html");
  //   await fs.writeFile(htmlPath, htmlCode);

  //   // Запуск сборки через Webpack или другой бандлер
  //   exec(
  //     "npx webpack --entry ./index.js --output ./bundle.js --mode production",
  //     { cwd: buildDir },
  //     async (err, stdout, stderr) => {
  //       if (err) {
  //         console.error("Build error:", stderr);
  //         return new Response("Build error", { status: 500 });
  //       }

  //       // Создание архива с результатами сборки
  //       const archive = archiver("zip", { zlib: { level: 9 } });
  //       res.setHeader("Content-Type", "application/zip");
  //       res.setHeader(
  //         "Content-Disposition",
  //         `attachment; filename="${componentName}.zip"`
  //       );
  //       archive.pipe(res);

  //       archive.directory(buildDir, false);
  //       await archive.finalize();

  //       // Очистка временной директории после отправки
  //       await fs.rm(buildDir, { recursive: true, force: true });
  //     }
  //   );

  //     // Путь к директории с компонентами
  //     const componentsDir = path.resolve(process.cwd(), "src", "components");
  //     await fs.mkdir(componentsDir, { recursive: true });

  //     // Сохраняем компонент в файл
  //     const componentPath = path.join(componentsDir, `${componentName}.js`);
  //     await fs.writeFile(componentPath, componentCode);

  //     // Запуск сборки Webpack через npm run build
  //     exec("npm run build", (err, stdout, stderr) => {
  //       if (err) {
  //         console.error("Ошибка сборки:", stderr);
  //         return new Response("Ошибка сборки", { status: 500 });
  //       }

  //       console.log("Сборка завершена:", stdout);

  //       // Создаем архив с бандлом
  //       const outputDir = path.resolve(process.cwd(), "out"); // директория с результатами сборки Next.js

  //       const archive = archiver("zip", {
  //         zlib: { level: 9 }, // Максимальное сжатие
  //       });

  //       res.setHeader("Content-Type", "application/zip");
  //       res.setHeader(
  //         "Content-Disposition",
  //         `attachment; filename="${componentName}.zip"`
  //       );
  //       archive.pipe(res);

  //       archive.directory(outputDir, false);

  //       archive.finalize();
  //     });
  //   } else {
  //     return new Response("Метод не разрешен", { status: 405 });
  //   }
  return new Response(JSON.stringify("Hello from Next.js!"));
};
