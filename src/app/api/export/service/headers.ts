import { projectName } from "../constatnts";

export async function initHeaders() {
  const headers = new Headers();
  headers.append(
    "Content-Disposition",
    `attachment; filename=${projectName}-build.zip`
  );
  headers.append("Content-Type", "application/zip");

  return headers;
}
