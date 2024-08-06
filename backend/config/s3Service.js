import AWS from 'aws-sdk';


export const s3UploadPicture = async(file)=>{
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    }
  });
  
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `public/assets/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
  }
  return await s3.upload(params).promise();
}

export const s3UploadFiles = async(files)=>{
  const s3 = new AWS.S3(
    {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
      }
    });
    

  const params = files.map(file => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `public/assets/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }
  })


  return await Promise.all(params.map(param => s3.upload(param).promise()))

}