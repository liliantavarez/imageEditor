//importando pacaote sharp
const sharp = require("sharp");
//importando pacote para comprimir imagem
const compress_images = require("compress-images");
//pacote do node para trabalhar com arquivos
const fs = require("fs");

//pegando caminho do arquivo de imagem e tamanho
let path = process.argv[2];
let width = Number(process.argv[3]);

//usando pacote sharp para fazer processamentos em imagens
function resize(inputPath, outputPath, width) {
  sharp(inputPath).rotate(270)
    .resize({ width: width })
    .toFile(outputPath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Imagem redimensionada com sucesso!");
        //compress(outputPath, "./compressed/");
      }
    });
}

function compress(pathInput, outputPath) {
  compress_images(
    pathInput,
    outputPath,
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {
      console.log("-------------");
      console.log(error);
      console.log(completed);
      console.log(statistic);
      console.log("-------------");

      fs.unlink(pathInput, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(pathInput, "apagado!");
        }
      });
    }
  );
}

resize(path, "./temp/output_resize.jpg", width);
