export const tsconfigContent = {
  compilerOptions: {
    target: "es6",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    module: "esnext",
    moduleResolution: "node",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "react-jsx",
    outDir: "./build",
    baseUrl: "./src",
    paths: {
      "@lib/*": ["./lib/*"],
    },
  },
  include: ["src"],
};
