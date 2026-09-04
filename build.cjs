const fs=require('fs');
fs.mkdirSync('public',{recursive:true});
for(const file of ['index.html','style.css','script.js'])fs.copyFileSync(file,`public/${file}`);
fs.cpSync('assets','public/assets',{recursive:true});
console.log('Site estático pronto em public/.');
