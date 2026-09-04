# Cartinha de Thiago para Elly

HTML, CSS e JavaScript puro. Abra index.html ou execute npm run dev. npm run build prepara dist/.

Textos, fotos e música são configuráveis em assets/content.js. O áudio atual é assets/seja-como-for.m4a, extraído do vídeo fornecido pelo usuário (AAC original, sem faixa de vídeo). O site não usa YouTube para reproduzir.

O service worker guarda a cartinha e a música após o primeiro carregamento online em HTTPS/localhost. Espere a mensagem de confirmação no player. O funcionamento offline depende de o navegador manter os dados deste site; outro aparelho precisa carregar uma primeira vez. Arquivos locais também podem ser abertos sem internet. Fontes externas têm alternativas locais.

Contador: 16/03/2026 às 17h30, Bahia (UTC-3), com anos/meses de calendário. PIN: 160326, dica nosso dia. O PIN é uma trava visual, não criptografia dos arquivos.
