const express = require('express');
const { S3Client, HeadObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const app = express();

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'x',
    secretAccessKey: 'x',
  }
});

app.get("/5sec", async (req, res) => {
  setTimeout(() => {
    res.json({hello: "world", time: (new Date()).toISOString()})
  }, 5000);
});

app.get('/download', async (req, res) => {
  const params = {
    Bucket: 's3-ramonsario-aws-2023',
    Key: '1gb-file.zip',
  };

  try {
    const headParams = { Bucket: params.Bucket, Key: params.Key };
    const { Metadata, ContentLength } = await s3Client.send(new HeadObjectCommand(headParams));
    const contentType = Metadata['content-type'];

    const command = new GetObjectCommand(params);
    const { Body } = await s3Client.send(command);

    res.set('Content-Type', contentType);
    res.set('Content-Length', ContentLength);

    Body.pipe(res);

    Body.on('end', () => {
      console.log('Served by Amazon S3: ' + params.Key);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
