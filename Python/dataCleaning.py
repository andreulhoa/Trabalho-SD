import os
from bs4 import BeautifulSoup
import json
import requests

downloaded_pages_dir = './paginas_html'

data = []

def extract_td_elements(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        soup = BeautifulSoup(content, 'html.parser')        
        table = soup.find('table', class_="table-custom table-roster")
        if table:
            rows = table.find_all('tr')  
            
            for row in rows[1:]:
                td_elements = row.find_all('td')
                jogadorTeste = {
                    "nome": td_elements[2].text,
                    "clube": td_elements[3].text,
                    "posicao": td_elements[4].text,
                    "idade": td_elements[7].text,
                    "overall": td_elements[8].text,

                }
                data.append(jogadorTeste)
             

#Função para ler todos os arquivos da pasta paginas_html
def process_all_files(directory):
    for file_name in os.listdir(directory):
        if file_name.endswith('.html'):
            file_path = os.path.join(directory, file_name)
            extract_td_elements(file_path)

process_all_files(downloaded_pages_dir)

print(data)

response = requests.post("http://node-server:3000/upload", headers={'Content-Type': 'application/json'}, data=json.dumps(data))