export async function initHeaders() {
  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="test.zip"');
  headers.append("Content-Type", "application/zip");

  return headers;
}
