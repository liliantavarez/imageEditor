//importando pacaote sharp
const sharp = require('sharp')

//pegando caminho do arquivo de imagem e tamanho
let path = process.argv[2]
let width = Number(process.argv[3])

//usando pacote sharp para fazer processamentos em imagens
function resize(path,width){

    sharp(path).resize({width: width}).toFile('./temp/output_resize.jpg',(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Imagem redimensionada com sucesso!")
        }
    })
}

resize(path,width)