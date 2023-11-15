const ong = {
    imagem: "ong-exemplo.jpg",
    titulo: "ONG",
    desc: "loremLorem ipsum dolor sit, amet consectetur adipisicing elit. " +
    "Natus doloribus molestias aperiam quasi beatae dolorum" +
    "fugit, nisi est autem tempore consequuntur ullam numquam " +
    "id adipisci quia aut velit quisquam qui ?" +
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. " +
    "Natus doloribus molestias aperiam quasi beatae dolorum" +
    "fugit, nisi est autem tempore consequuntur ullam numquam " +
    "id adipisci quia aut velit quisquam qui ?" +
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. " +
    "Natus doloribus molestias aperiam quasi beatae dolorum" +
    "fugit, nisi est autem tempore consequuntur ullam numquam " +
    "id adipisci quia aut velit quisquam qui ?",

}

function addOng() {
    let qtdOngsEsq = document.querySelectorAll("#modelo-esq").length;
    let qtdOngsDir = document.querySelectorAll("#modelo-dir").length;

    if ((qtdOngsEsq + qtdOngsDir) % 2 != 0) {
        //ADICIONA ONG COM IMAGEM A DIREITA
        const novaOngDesc = $("#modelo-dir").clone().removeAttr(`id`).removeClass('hidden');
        $('img', novaOngDesc).attr(`src`, ong.imagem);
        $('h1', novoOngDesc).html(produto.titulo);
        $('p', novoOngDesc).html(produto.desc);
        $("#container").append($(novaOngCard));

    } else {
        //ADICIONA ONG COM IMAGEM A ESQUERDA
        const novaOng = $("#modelo-esq").clone().removeAttr(`id`).removeClass('hidden');
        $('img', novaOngDesc).attr(`src`, ong.imagem);
        $('h1', novoOngDesc).html(produto.titulo);
        $('p', novoOngDesc).html(produto.desc);
        $("#container").append($(novaOngCard));
    }

}