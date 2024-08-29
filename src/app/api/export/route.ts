import { exec } from "child_process";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pageData } = await req.json();

    // Создаем временную папку для сборки
    const buildDir = path.join(process.cwd(), "tempBuild");
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir);
    }

    // Сохраняем данные страницы в файлы, например, в JSON или напрямую в HTML/JSX
    fs.writeFileSync(
      path.join(buildDir, "pageData.json"),
      JSON.stringify(pageData)
    );

    // Запуск сборки
    await new Promise((resolve, reject) => {
      exec(
        "npx next build && npx next export",
        { cwd: buildDir },
        (err, stdout, stderr) => {
          if (err) {
            console.error(`Ошибка сборки: ${stderr}`);
            return reject(new Error("Ошибка сборки"));
          }
          resolve("");
        }
      );
    });

    // Архивация файлов
    const zipPath = path.join(process.cwd(), "exportedSite.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    await new Promise((resolve, reject) => {
      output.on("close", resolve);
      archive.on("error", reject);
      archive.pipe(output);
      archive.directory(buildDir, false);
      archive.finalize();
    });

    // Возвращаем файл пользователю
    const fileBuffer = fs.readFileSync(zipPath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="exportedSite.zip"',
        "Content-Type": "application/zip",
      },
    });
  } catch (error) {
    console.error("Ошибка экспорта:", error);
    return new NextResponse("Ошибка экспорта", { status: 500 });
  }
}

// // pages/api/export.js
// import { exec } from "child_process";
// import path from "path";
// import fs from "fs";
// import archiver from "archiver";
// import { NextApiResponse } from "next";
// type ResponseData = any;

// export const POST = async (
//   req: Request,
//   res: NextApiResponse<ResponseData>
// ) => {
//   const body = await req.json();
//   const { projectData } = body;

//   if (!projectData) {
//     return res.status(400).json({ error: "Project data is required" });
//   }

//   try {
//     // Создаем временную директорию для сборки
//     const tempDir = path.resolve(process.cwd(), "temp_build");
//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir);
//     }

//     // Создаем файлы проекта
//     const projectDir = path.join(tempDir, "my-website");
//     fs.mkdirSync(projectDir);
//     fs.mkdirSync(path.join(tempDir, "my-website"));

//     // Генерируем файлы страниц
//     for (const [pageName, pageContent] of Object.entries(projectData.pages)) {
//       const filePath = path.join(`${projectDir}`, `page.js`);
//       fs.writeFileSync(filePath, pageContent as string);
//     }

//     // Создаем package.json с необходимыми зависимостями
//     const packageJson = {
//       name: "my-website",
//       version: "1.0.0",
//       scripts: {
//         build: "next build && next export",
//       },
//       dependencies: {
//         react: "^18.0.0",
//         "react-dom": "^18.0.0",
//       },
//     };
//     fs.writeFileSync(
//       path.join(projectDir, "package.json"),
//       JSON.stringify(packageJson, null, 2)
//     );

//     // Установка зависимостей и сборка проекта
//     exec(
//       "npm install && npm run build",
//       { cwd: projectDir },
//       (err, stdout, stderr) => {
//         if (err) {
//           console.error("Build error:", stderr);
//           return new Response("Build error", { status: 405 });
//         }

//         console.log("Build output:", stdout);

//         // Создание архива с продакшн-билдом
//         const output = fs.createWriteStream(
//           path.join(tempDir, "my-website.zip")
//         );
//         const archive = archiver("zip", { zlib: { level: 9 } });

//         output.on("close", () => {
//           console.log(archive.pointer() + " total bytes");
//           console.log(
//             "Archiver has been finalized and the output file descriptor has closed."
//           );

//           // Отправка архива клиенту
//           res.setHeader("Content-Type", "application/zip");
//           res.setHeader(
//             "Content-Disposition",
//             `attachment; filename="my-website.zip"`
//           );
//           fs.createReadStream(path.join(tempDir, "my-website.zip")).pipe(res);
//         });

//         archive.on("error", (err) => {
//           console.error("Archiving error:", err);
//           return new Response("Internal Server Error", { status: 500 });
//         });

//         // Архивируем содержимое папки с билдом
//         archive.directory(path.join(projectDir, "out"), false);

//         // Финализируем архив
//         archive.pipe(output);
//         archive.finalize();
//       }
//     );
//     return new Response("Ok", { status: 200 });
//   } catch (error) {
//     console.error("Error exporting project:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// };
