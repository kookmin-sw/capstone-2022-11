const router = require('express').Router()
const multiparty = require('multiparty')
const url = require('url')
const config = require('../../config/index');
const AWS = require('aws-sdk');
const path = require("path");


const {BUCKET_NAME} = config
const {AWS_BUCKET_URL} = config
const {AWS_BUCKET_ACCESS_ID} = config
const {AWS_BUCKET_ACCESS_KEY} = config




AWS.config.update({
    region:         'ap-northeast-2',
    accessKeyId:    AWS_BUCKET_ACCESS_ID,
    secretAccessKey: AWS_BUCKET_ACCESS_KEY
})

router.get('/*', (req,res)=>{
    const {pathname} = url.parse(req.url, true)
    res.redirect(`https://${AWS_BUCKET_URL}${pathname}`)
})

router.post('/',function(req, res){

    const form = new multiparty.Form()
    // 에러 처리
    form.on('error', function(err){
        res.status(500).end()
    })
    // form 데이터 처리
    form.on('part', function(part){
        //파일 아니면 res.error
        if(!part.filename)
            return res.status(400).json({msg: "올바르지 않은 파일입니다."});
        //filename -> id+totalNum
        const filename = part.filename
        //음악, 이미지 파일 다른 폴더로 업로드
        const extension = path.extname(part.filename);
        var params = {}
        //파일 확장자 확인
        if(extension === '.mp3' || extension === '.wav')
            params = { Bucket:BUCKET_NAME, Key:'Music/'+filename, Body:part, ContentType: 'audio/mpeg' }
        else if(extension === '.jpg' || extension === '.png')
            params = { Bucket:BUCKET_NAME, Key:'Image/'+filename, Body:part, ContentType: 'image' }
        else
            return res.status(400).json({msg: "올바르지 않은 파일입니다."});
        const upload = new AWS.S3.ManagedUpload({ params });
        upload.promise()

        part.on('end', function(){
            // 파일 업로드 후 실행할 추가 코드
            console.log("Uploaded!")
        })
        part.on('error', function(err){
            console.log(err)
        })
    })
    // form 종료
    form.on('close', function(){
        // 모든 파일 업로드 후 실행할 추가 코드
        res.end()
    })
    form.parse(req)

})

module.exports = router