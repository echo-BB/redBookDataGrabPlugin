import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { CRX_CONTENT_OUTDIR } from "./globalConfig";

export default defineConfig({
    build:{
        outDir: CRX_CONTENT_OUTDIR,
        lib:{
            entry:[
                // eslint-disable-next-line no-undef
                path.resolve(__dirname,'src/content/index.jsx')
            ],
            formats:['cjs'],
            fileName:()=>{
                return 'content.js'
            }
        },
        rollupOptions:{
            output:{
                // eslint-disable-next-line no-unused-vars
                assetFileNames:(assetInfo)=>{
                    return 'content.css'
                }
            }
        }
    },
    resolve:{
        alias:{
            // eslint-disable-next-line no-undef
            '@':path.resolve(__dirname,'src')
        }
    },
    define:{
        'process.env.NODE_ENV':null
    },
    plugins:[react()]
})