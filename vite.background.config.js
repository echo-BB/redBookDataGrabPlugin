import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { CRX_BACKGROUND_OUTDIR } from "./globalConfig";

export default defineConfig({
    build:{
        outDir:CRX_BACKGROUND_OUTDIR,
        lib:{
            // eslint-disable-next-line no-undef
            entry:[path.resolve(__dirname,'src/background/index.jsx')],
            formats:['cjs'],
            fileName:()=>{
                return 'background.js'
            }
        }
    },
    resolve:{
        alias:{
            // eslint-disable-next-line no-undef
            '@':path.resolve(__dirname, 'src')
        }
    },
    plugins:[react()]
})