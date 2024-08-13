#!/bin/bash

# Definir o diretório de saída para os arquivos HTML
output_dir="./paginas_html"

# Criar o diretório, se não existir
mkdir -p "$output_dir"

# Função para baixar uma página e salvar no arquivo especificado
download_page() {
    local url=$1
    local output_file=$2

    if curl -s "$url" -o "$output_file"; then
        echo "Successfully downloaded $url to $output_file"
    else
        echo "Failed to download $url"
    fi
}

# Baixar as páginas
for i in $(seq 0 33); do
    url="https://pt-br.soccerwiki.org/search/player?firstname=&surname=&nationality=&leagueid=&position=&minrating=60&maxrating=99&minage=15&maxage=60&country=&minheight=150&maxheight=220&foot=&submit=&offset=$((i * 15))"
    output_file="${output_dir}/paginasBaixadas_$((i + 1)).html"
    download_page "$url" "$output_file"
done
