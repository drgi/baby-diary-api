const fs = require('fs');
const { resolve, normalize } = require('path');
const DEFAULT_PHOTO_DIR = '../static/photos'
function makeAndTestDir(dateStr) {
    const dir = resolve(__dirname, DEFAULT_PHOTO_DIR)
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir) }
    const dayDir = resolve(__dirname, `${DEFAULT_PHOTO_DIR}/${dateStr.split('.').join('-')}`)
    if (!fs.existsSync(dayDir)) { 
       fs.mkdirSync(dayDir) }
    return dayDir
}

function saveFiles(files, dateStr) {
    const dayDir = makeAndTestDir(dateStr)
    const pathArr = []
    if(dayDir) {
        files.forEach(file => {
            const fileName = Date.now() + '.jpg'
            const filePath = resolve(__dirname, `${dayDir}/${fileName}`)
            fs.writeFileSync(filePath, file.buffer)
            pathArr.push({fileName, url: `/photos/${dateStr.split('.').join('-')}/${fileName}`})            
        });
    }
    return pathArr
}
function deleteFile(file, dateStr) {
    const filePath = resolve(__dirname, DEFAULT_PHOTO_DIR, dateStr.split('.').join('-'), file.fileName)
    console.log('FilePath: ',filePath)
    if (!fs.existsSync(filePath)) { 
        throw new Error('Файл для удаления не найден')
    } 
    fs.unlinkSync(filePath)
    return true
} 
module.exports = { saveFiles, deleteFile }