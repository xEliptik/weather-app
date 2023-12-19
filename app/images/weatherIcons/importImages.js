import { readdirSync, renameSync, writeFileSync } from 'fs';
import { parse, join } from 'path';

const svgFolder = './'; // Ajusta la ruta de la carpeta donde se encuentran tus SVG
const outputFile = './output-file.js'; // Ajusta el nombre del archivo de salida

const generateExports = () => {
    const svgFiles = readdirSync(svgFolder).filter(file => file.endsWith('.svg'));

    const exportStatements = svgFiles.map(file => {
        const fileName = parse(file).name.replace(/\s+/g, '_'); // Reemplaza espacios con guiones bajos
        const formattedFileName = fileName.replace(/\W+/g, ''); // Elimina caracteres no alfanuméricos
        const newFileName = file.replace(/\s+/g, '_').replace(fileName, formattedFileName);

        // Renombra el archivo
        const oldPath = join(svgFolder, file);
        const newPath = join(svgFolder, newFileName);
        renameSync(oldPath, newPath);

        return `export { default as ${formattedFileName} } from './${newFileName}';`;
    });

    const outputContent = exportStatements.join('\n');

    writeFileSync(outputFile, outputContent);

    console.log(`Exports generated successfully in ${outputFile}`);
};

generateExports();
